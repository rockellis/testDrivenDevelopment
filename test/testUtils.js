'use strict';

var lib = process.env['LIB'] || 'lib';

var dal = require('../lib/dal.js'),
  events = require('../lib/events.js'),
  exec = require('child_process').exec,
  request = require('request'),
  assert = require('assert'),
  path = require('path'),
  fs = require('fs');

// var BASE_URL = 'http://127.0.0.1',
var BASE_URL = 'http://localhost',
  port = randomInt(2000, 10000);

/**
 * Get an integer between min and max.
 * @param   {Number} min
 * @param   {Number} max
 * @returns {Number}
 */
function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Get the port our test server is running on.
 * @return {Number}
 */
exports.getServerPort = function () {
  return port;
};

exports.loadTestsOfType = function (type) {
  var p = path.join(__dirname, './', type);
  var files = fs.readdirSync(p);

  files.forEach(function (file) {
    if (path.extname(file) === '.js') {
      require(path.join(__dirname, './', type, file));
    }
  });
};

exports.clearDatabase = function (callback) {
  // TODO: should connect to mongo directly
  dal.removeAllCollections(callback);
};

/**
 * Start a server by requiring application.js
 * @param {Function} callback
 */
exports.startServer = function (clearDB, callback) {
  console.log('Starting test server on port, please wait %s', port);
  process.env.FH_USE_LOCAL_DB = true;

  function start(callback) {

    events.on(events.emittedEvents.fhReady, function () {
      return callback();
    });
    require('../application.js');
  }

  if (clearDB) {
    exports.clearDatabase(function () {
      start(callback);
    })
  } else {
    start(callback);
  }
};

exports.cloudPost = function (path, data, cb) {
  var url = [BASE_URL, ':', process.env.FH_PORT, path].join('');

  console.log('Posting to %s', url);
  data = data || null;

  request.post({
    url: url,
    form: data,
  }, function (err, response, data) {
    if (err) {
      console.error('cloudCall error: %s', err);
      return cb(err, null);
    }
    cb(null, JSON.parse(data));
  })
};

exports.cloudGet = function (path, data, cb) {
  var url = [BASE_URL, ':', process.env.FH_PORT, path].join('');

  console.log('Http GET: %s', url);
  data = data || null;

  request.get({
    url: url,
    form: data,
  }, function (err, response, data) {
    if (err) {
      console.error('cloudGet error: %s', err);
      return cb(err, null);
    }
    cb(null, JSON.parse(data));
  })
};
