var _ = require('underscore');

exports.add = function(numbers) {
  console.log('Adding array of numbers');

  var total = 0;
  _.each(numbers, function(num) {
    total = total + num;
  });

  return total;
}

exports.subtract = function(num1, num2) {
  return num1 - num2;
}