"use strict";

var fs = require('fs');
var join = require('path').join;
var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

var app = express();
var port = 3000;

// Connect to mongodb
var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(join(__dirname, 'models')).forEach(function(file) {
    if (~file.indexOf('.js')) {
        require(join(__dirname, 'models', file));
    }
});


// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);

module.exports = app;