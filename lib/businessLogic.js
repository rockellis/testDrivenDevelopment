var dal = require('./dal');

exports.countUsers = function(cb) {

  dal.list('Users', {}, function(err, list) {
    if (err) {
      cb(err);
    } else {
      cb(null, list.count);
    }
  })
}