process.on('uncaughtException', console.log.bind(console));

var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');
var main = require('./lib/main.js');
var events = require('./lib/events.js');

// list the endpoints which you want to make securable here
var securableEndpoints;
// fhlint-begin: securable-endpoints
securableEndpoints = [];
// fhlint-end

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

app.use('/cloud', mbaasExpress.cloud(main));

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// fhlint-begin: custom-routes
// Add If running locally....
if (process.env['FH_USE_LOCAL_DB']) {
  app.use('/box/srv/1.1/app/init', require('./lib/localInit.js')());
}

// fhlint-end

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
process.env.FH_PORT = port;

// process.env.FH_USE_LOCAL_DB = true;

var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
  events.emit(events.emittedEvents.fhReady, server);
});