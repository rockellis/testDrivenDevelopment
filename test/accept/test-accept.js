'use strict';

var assert = require('assert'),
  utils = require('../testUtils');

before(function (done) {
  // Start the node server
  utils.startServer(true, function () {
    done();
  });
});

describe('Test users routing module ', function () {

  it('should return the correct number of users ', function (done) {

    utils.cloudGet('/getUsersCount', null, function (err, result) {

      assert.equal(result.numUsers, 0, "Number of Users is not as expected");
      done();
    });
  });

  // TODO: add a test that send a user to the cloud app and then verify that
  // there is exactly 1 user in the DB

});
