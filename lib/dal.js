var $fh = require('fh-mbaas-api');
var _ = require('underscore');
var async = require('async');

function noop() {}

// Generic wrapper for all database callbacks
// Ensures logging occurs and a client friendly error is propogated up
function dbCb(cb) {
  return function(err, res) {
    if (err) {
      console.error("Error!!!", err);
      return cb("Error!!!");
    }
    return cb(null, res);
  };
}

exports.create = function(col, fields, cb) {
  fields._createDateTime = Date.now();

  $fh.db({
    'act': 'create',
    'type': col,
    'fields': fields
  }, dbCb(cb));
};

exports.read = function(col, guid, cb) {
  $fh.db({
    'act': 'read',
    'type': col,
    guid: guid
  }, dbCb(cb));
};

exports.update = function(col, guid, fields, cb) {
  $fh.db({
    'act': 'update',
    'type': col,
    'fields': fields,
    guid: guid
  }, dbCb(cb));
};

exports.list = function(col, restrictions, cb) {
  var params = {
    'act': 'list',
    'type': col
  };

  if (restrictions && typeof restrictions === 'function') {
    cb = restrictions;
    restrictions = null;
  } else if (restrictions) {
    params = _.extend(params, restrictions);
  }

  $fh.db(params, dbCb(cb));
};

var removeAll = exports.removeAll = function(col, cb) {
  $fh.db({
    'act': 'deleteall',
    'type': col
  }, dbCb(cb));
};

exports.removeAllCollections = function(callback) {

  var collections = [
    'Users'
  ];

  // callback = callback || noop;
  async.eachSeries(collections, function(col, cb) {
    removeAll(col, cb);
  }, function(err) {
    callback(err);
  });
};