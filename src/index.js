import path, { dirname } from 'path'
import { existsSync } from 'fs'

export default function (api) {
  const { types, template } = api
  return {
    visitor: {
      ImportDeclaration(path, state) {
        let importPath = path.node.source.value
        if (!importPath.endsWith('.proto')) {
          return
        }
        if (path.node.specifiers.length === 0) {
          path.remove()
          return
        }
        const importOptions = {
          keepCase: false,
          longs: 'Number',
          enums: 'String',
          bytes: 'String',
          defaults: false,
          arrays: false,
          objects: false,
          oneofs: false,
          ...state.opts,
          includeDirs: [
            dirname(state.file.opts.filename),
            ...state.opts.includeDirs ? state.opts.includeDirs : [],
          ],
        }
        const importAbsPath = require.resolve(importPath, { paths: importOptions.includeDirs })
        const proto = require("@grpc/proto-loader").loadSync(importPath, {
          ...importOptions,
          longs: eval(importOptions.longs),
          enums: eval(importOptions.enums),
          bytes: eval(importOptions.bytes),
        })
        let fileDescriptorProtos
        path.replaceWithMultiple(
          template(`const DEFAULT_SPECIFIER = require('@grpc/grpc-js').loadPackageDefinition(JSON.parse('${
            JSON.stringify(
              require("@grpc/proto-loader").loadSync(importPath, {
                ...importOptions,
                longs: eval(importOptions.longs),
                enums: eval(importOptions.enums),
                bytes: eval(importOptions.bytes),
              }),
              (key, value) => {
                if (key === 'fileDescriptorProtos') {
                  fileDescriptorProtos = value
                  return []
                }
                return value
              }
            )
          }', function (key, value) {
            return key === 'fileDescriptorProtos'
              ? JSON.parse('${JSON.stringify(fileDescriptorProtos)}')
              : value
          }));${path.node.specifiers.map(specifier => {
            if (specifier.type === 'ImportDefaultSpecifier') {
              return ''
            }
            return `const ${specifier.local.name} = DEFAULT_SPECIFIER.${specifier.local.name}`
          }).join(';')}`,
          {
            placeholderPattern: false,
            placeholderWhitelist: new Set(['DEFAULT_SPECIFIER']),
          })({
            DEFAULT_SPECIFIER: path.node.specifiers
              .filter(specifier => specifier.type === 'ImportDefaultSpecifier')
              .map(specifier => types.identifier(specifier.local.name))[0]
            || types.identifier(`__import_proto_default_specifier_${importPath.replace(/[.\/]/g, '_')}__`)
          })
        )
      }
    }
  }
}
