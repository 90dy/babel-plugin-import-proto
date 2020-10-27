[![npm Version](https://img.shields.io/npm/v/babel-plugin-import-proto.svg)](https://www.npmjs.com/package/babel-plugin-import-proto)
[![npm Downloads](https://img.shields.io/npm/dm/babel-plugin-import-proto.svg)](https://www.npmjs.com/package/babel-plugin-import-proto)
[![npm License](https://img.shields.io/npm/l/babel-plugin-import-proto.svg)](https://www.npmjs.com/package/babel-plugin-import-proto)

# babel-plugin-import-proto

Babel plugin enabling `import` syntax for `.proto` files.

## Prerequisites

```
npm install -D @babel/core @grpc/proto-loader
npm install @grpc/grpc-js
```

## Install

```
npm install -D babel-plugin-import-proto
```

In `.babelrc`

```
{
  'plugins': ['import-proto']
}
```

Each time you modify a Protobuf file, the cache must be cleared for the changes to take effect.

## Options

| Option | Type | Default | Description |
|---|---|---|---
| `keepCase` | `Boolean` | `false` | Preserve field names. The default is to change them to camel case.
| `longs` | `'String'` or `'Number'` or `'Long'` | `'Number'` | The constructor name of type to use to represent `long` values.
| `enums` | `'String'` or `'Number'` | `'String'` | The constructor name of type to use to represent `enum` values.
| `bytes` | `'String'` or `'Array'` or `'Buffer'` | `'String'` | The constructor name of type to use to represent `bytes` values.
| `defaults` | `Boolean` | `false` | Set default values on output objects.
| `arrays` | `Boolean` | `false` | Set empty arrays for missing array values even if `defaults` is `false`.
| `objects` | `Boolean` | `false` | Set empty objects for missing object values even if `defaults` is `false`.
| `oneofs` | `Boolean` | `false` | Set virtual oneof properties to the present field's name.
| `includeDirs` | `Array<String>` | `[]` | A list of search paths for imported `.proto` files.

## Examples

```js
import { test } from './test/fixtures/example.proto'
import grpc from '@grpc/grpc-js'

// server.js
const server = new grpc.Server()
server.addProtoService(test.fixture.exampleService.service, new ExampleServiceServerImplem())
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()

// client.js
const client = new test.fixture.exampleService('localhost:50051', grpc.credentials.createInsecure())
client.getExampleEntity({ id: 0 }, function (err, exampleEntity) {
  if (err) {
    // do something
  } else {
    // do something
  }
})
```
