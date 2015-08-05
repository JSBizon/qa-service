"use strict";

var questions = require('questions');
var answers = require('answers');

module.exports = function (app) {

    //app.param('id', questions.load);
    app.get('/questions', questions.index);
    app.get('/questions/new', questions.new);
    app.post('/questions', questions.create);
    app.get('/questions/:id', questions.show);

    app.post('/questions/:id/answers', answers.create);
    app.get('/', questions.index);


    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
}
