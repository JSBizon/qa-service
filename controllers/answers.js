"use strict";

var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var tools = require('tools');

exports.create = function (req, res) {
    Question.findOne({ _id : req.params.id }, function(err, question) {
        if (err) {
            return res.render('500');
        }
        question.addAnswer(req.body.username, req.body.body, function (err) {
            if (err) {
                res.render('questions/show', {
                    title: question.title,
                    question: question,
                    req: req,
                    errors: tools.errors(err.errors || err)
                });

            } else {
                res.redirect('/questions/'+ question.id);
            }
        });
    });
}
