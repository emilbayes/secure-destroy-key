var sodium = require('sodium-native')
var isSecureBuffer = require('is-secure-buffer')
var assert = require('nanoassert')

module.exports = function (key) {
  assert(isSecureBuffer(key), 'key must be Secure Buffer')
  sodium.sodium_mprotect_readwrite(key)
  sodium.sodium_memzero(key)
  sodium.sodium_mprotect_noaccess(key)
}
