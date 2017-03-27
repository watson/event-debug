'use strict'

module.exports = function (emitter, type) {
  var emit = emitter && emitter.emit
  if (typeof emit !== 'function') return

  var start = Date.now()

  emitter.emit = function (event) {
    var end = Date.now()
    var diff = end - start
    start = end

    console.log('%s: %s +%sms', type || emitter.constructor.name, event, diff)

    return emit.apply(this, arguments)
  }
}
