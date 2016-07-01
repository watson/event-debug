'use strict'

module.exports = function (emitter, type) {
  var emit = emitter && emitter.emit
  if (!emit) return
  emitter.emit = function (event) {
    console.log('%s: %s', type || emitter.constructor.name, event)
    return emit.apply(this, arguments)
  }
}
