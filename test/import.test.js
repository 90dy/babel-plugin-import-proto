import path from 'path'
import { transformFileSync } from '@babel/core'

export function transformWithPlugin(pathname, opts = {}) {
  const { code, ast } = transformFileSync(path.join(__dirname, pathname), {
    plugins: [[path.join(__dirname, '../src/index.js'), opts]],
    ast: true
  })
  return { code: rmVarKeywords(code), ast }
}

function rmVarKeywords(code) {
  return code
    .split('\n')
    .map(line => (line.startsWith('var ') ? line.slice(4) : line))
    .join('\n')
}

export function nameOf(operationDoc) {
  return operationDoc.definitions[0].name.value
}

const defaultOptions = {
  longs: 'String',
  includeDirs: [path.join(__dirname, './fixture')]
}

describe.each([{ longs: 'String' }])('plugin options = %j', opts => {
  describe('example.proto', () => {
    test('specifier', () => {
      const { code } = transformWithPlugin('./fixture/example/specifier.js', opts)
      eval(code)
    })
    test('default', () => {
      const { code } = transformWithPlugin('./fixture/example/default.js', opts)
      eval(code)
    })
    test('no-specifier', () => {
      const { code } = transformWithPlugin('./fixture/example/no-specifier.js', opts)
      eval(code)
    })
  })
})
