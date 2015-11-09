var businessLogic = require('./businessLogic');

exports.getUsersCount = function(params, cb) {
  console.log('Get getUsersCount');
  businessLogic.countUsers(cb);
};