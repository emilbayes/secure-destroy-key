# `secure-destroy-key`

[![Build Status](https://travis-ci.org/emilbayes/secure-destroy-key.svg?branch=master)](https://travis-ci.org/emilbayes/secure-destroy-key)

> Destroy a Secure Buffer key safely

A piece in the puzzle towards [`secure-key-management`](https://github.com/emilbayes/secure-key-management)

## Usage

```js
var destroyKey = require('secure-destroy-key')
destroyKey(key)
```

**:warning: Warnings:**

* Once the key is destroyed, any access to it (whether read or write) will
  crash your program with no mercy

## API

### `destroyKey(secureBuf)`

`secureBuf` must be a Secure Buffer created with `sodium-native@2.4` or greater.
It can also be a primitive object with some of the following properties (eg.
in case of a key pair): `private`, `secret`, `privateKey`, `secretKey`,
`public`, `publicKey`, `identity` or `identityKey`, which in turn will be called
with `destroyKey`

Destroying the `secureBuf` will safely wipe the key from memory and mark it for
`noaccess`, to prevent any accidental misuse.

Note that the `secureBuf` looks like a normal `Buffer`, but has some extra
properties. You can read more about
[Secure Buffers on `secure-key-management`](https://github.com/emilbayes/secure-key-management#secure-buffers)
Be wary about using any of the default Buffer operations on this Secure Buffer.

## Install

```sh
npm install secure-destroy-key
```

## License

[ISC](LICENSE)
