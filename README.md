[![npm Version](https://img.shields.io/npm/v/babel-plugin-import-proto.svg)](https://www.npmjs.com/package/babel-plugin-import-proto)
[![npm Downloads](https://img.shields.io/npm/dm/babel-plugin-import-proto.svg)](https://www.npmjs.com/package/babel-plugin-import-proto)
[![npm License](https://img.shields.io/npm/l/babel-plugin-import-proto.svg)](https://www.npmjs.com/package/babel-plugin-import-proto)

# babel-plugin-import-proto

Babel plugin enabling `import` syntax for `.proto` files.

## Prerequisites

```bash
yarn add @babel/core
```

## Install

```
yarn add -D babel-plugin-import-proto
```

In `.babelrc`

```
{
  'plugins': ['import-proto']
}
```

Each time you modify a Protobuf file, the cache must be cleared for the changes to take effect.
