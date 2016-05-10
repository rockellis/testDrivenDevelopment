'use strict';

var assert = require('assert'),
  proxyquire = require('proxyquire');

describe('Test business logic module', function () {

  it('should return businessLogic countUsers based on mock data', function (done) {

    var businessLogic = proxyquire('../../lib/businessLogic', {
      './dal': {
        list: function (col, restrictions, cb) {
          cb(null, users);
        }
      }
    });

    // TODO: Call businessLogic.countUsers and assert that the number of users is what is expected
    businessLogic.countUsers(function (err, count) {
      assert.equal(count, 3, 'Users are not the expected number');
      done();
    });

  });

  it('should throw an err from businesLogic ', function (done) {

    // TODO: Mock the .dal dependancy. Return an error from the list function.
    var businessLogic = proxyquire('../../lib/businessLogic', {
      './dal': {
        list: function (col, restrictions, cb) {
          cb(new Error('Problem reading database.'));
        }
      }
    });

    // TODO: Call businessLogic.countUsers and assert that an error was returned
    businessLogic.countUsers(function (err, count) {
      assert.notEqual(err, null, 'Expected an error to be thrown');
      done();
    });

  });

});

var users = {
  "count": 3,
  "list": [{
    "fields": {
      "name": "Dave"
    },
    "guid": "4e563ea44fe8e7fc19000001",
    "type": "Users"
  }, {
    "fields": {
      "name": "Mary"
    },
    "guid": "4e563ea44fe8e7fc19000002",
    "type": "Users"
  }, {
    "fields": {
      "name": "John"
    },
    "guid": "4e563ea44fe8e7fc19000003",
    "type": "Users"
  }]
}
