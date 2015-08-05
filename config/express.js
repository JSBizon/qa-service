"use strict";

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');
var multer = require('multer');
var swig = require('swig');

var helpers = require('view-helpers');
var pkg = require('../package.json');
var config = require('config');

module.exports = function(app) {

    app.use(compression({
        threshold: 512
    }));

    // Static files middleware
    app.use(express.static(config.root + '/public'));
    app.use(morgan('dev'));

    app.engine('html', swig.renderFile);
    app.set('views', config.root + '/views');
    app.set('view engine', 'html');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(multer());
    app.use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    /*

    app.use(csrf());

    app.use(function (req, res, next) {
        res.locals.csrf_token = req.csrfToken();
        next();
    });
    */

};
