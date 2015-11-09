/**
 * Manage global applcaition events.
 */
var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();

module.exports.emittedEvents = {
  // When nodeapp connect server is ready
  fhReady: 'fhReady',
};