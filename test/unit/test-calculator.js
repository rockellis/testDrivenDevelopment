'use strict';

var assert = require('assert'),
  calculator = require('../../lib/calculator');

describe('Test my simple calculator ', function () {

  it('should add the array of numbers ', function (done) {

    var result = calculator.add([1, 2, 3, 4, 5]);

    assert.equal(result, 15, "Addition does not match expected value");
    done();
  });

  it('should subtract the numbers correctly ', function (done) {

    var result = calculator.subtract(10, 5);

    assert.equal(result, 5, "Subtraction does not match expected value");
    done();
  });

});
