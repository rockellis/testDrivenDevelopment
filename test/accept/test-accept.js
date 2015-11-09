'use strict';

var assert = require('assert'),
  utils = require('../testUtils');

before(function(done) {
  utils.startServer(true, function() {
    done();
  });
});

describe('Test wall unit routing module ', function() {

  it('should something ', function(done) {

    utils.cloudCall('/cloud/getUsersCount', null, function(err, result) {

      console.log('back from cloud call');

      done();
    });
  });

});