var sodium = require('sodium-native')
var isSecureBuffer = require('is-secure-buffer')
var assert = require('nanoassert')

var supportedKeyProps = [
  'private', 'secret', 'privateKey', 'secretKey',
  'public', 'publicKey', 'identity', 'identityKey'
]

module.exports = function destroy (key) {
  if (Object.keys(key).some(k => supportedKeyProps.includes(k))) {
    Object.keys(key).forEach(function (k) {
      if (key[k]) destroy(key[k])
    })
    return
  }

  assert(isSecureBuffer(key), 'key must be Secure Buffer')
  sodium.sodium_mprotect_readwrite(key)
  sodium.sodium_memzero(key)
  sodium.sodium_mprotect_noaccess(key)
}
