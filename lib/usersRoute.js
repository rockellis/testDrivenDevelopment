var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var businessLogic = require('./businessLogic');

function usersRoute() {
  var users = new express.Router();
  users.use(cors());
  users.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  users.get('/getUsersCount', function (req, res) {
    console.log(new Date(), 'In users route GET /getUsersCount');

    businessLogic.countUsers(function (err, count) {

      if (err) {
        res.json(new Error(err));
      } else {
        res.json({
          'numUsers': count
        });
      }

    });
  });

  return users;
}

module.exports = usersRoute;
