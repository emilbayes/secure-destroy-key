var destroyKey = require('.')
var sodium = require('sodium-native')
var test = require('tape')
var exec = require('child_process').exec

test('works', function (assert) {
  var key = sodium.sodium_malloc(1)
  destroyKey(key)

  var keyPair = {
    public: sodium.sodium_malloc(1),
    private: sodium.sodium_malloc(1)
  }
  destroyKey(keyPair)

  assert.end()
})

test('input args', function (assert) {
  assert.throws(_ => destroyKey())
  assert.throws(_ => destroyKey(-1))
  assert.throws(_ => destroyKey(Buffer.alloc(1)))
  assert.end()
})

test('use after destroy', function (assert) {
  exec(`node -e 'var destroy = require(".")
                 var sodium = require("sodium-native")

                 var key = sodium.sodium_malloc(1)
                 console.log(key[0])
                 destroy(key)
                 key[0]'`, function (err, stdout, stderr) {
    assert.ok(/.*\n$/.test(stdout), 'should read first byte')
    assert.ok(err, 'should be killed by os')
    assert.end()
  })
})

test('use after destroy keypair', function (assert) {
  exec(`node -e 'var destroy = require(".")
                 var sodium = require("sodium-native")

                 var key = {
                   private: sodium.sodium_malloc(1),
                   public: sodium.sodium_malloc(1)
                 }
                 console.log(key.private[0])
                 destroy(key.private)
                 key.private[0]'`, function (err, stdout, stderr) {
    assert.ok(/.*\n$/.test(stdout), 'should read first byte')
    assert.ok(err, 'should be killed by os')
    assert.end()
  })
})

test('use after destroy keypair', function (assert) {
  exec(`node -e 'var destroy = require(".")
                 var sodium = require("sodium-native")

                 var key = {
                   private: sodium.sodium_malloc(1),
                   public: sodium.sodium_malloc(1)
                 }
                 console.log(key.public[0])
                 destroy(key.public)
                 key.public[0]'`, function (err, stdout, stderr) {
    assert.ok(/.*\n$/.test(stdout), 'should read first byte')
    assert.ok(err, 'should be killed by os')
    assert.end()
  })
})
