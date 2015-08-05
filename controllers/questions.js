"use strict";

var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var tools = require('tools');


exports.index = function(req, res) {
    var attrs = {};

    if (req.query.answered) {
        attrs['answers'] = {'$not': {'$size': 0}};
    }
    if (req.query.not_answered) {
        attrs['answers'] = {'$size': 0};
    }

    Question.find(attrs,function(err, questions) {
        if (err) return res.render('500');

        res.render('questions/index', {
            title: 'Questions',
            questions: questions
        });
    });
};


exports.new = function (req, res) {
    res.render('questions/new', {
        title: 'New Question',
        question: new Question()
    });
};


exports.create = function(req, res) {
    var question = new Question(req.body);

    question.save(function (err) {
        if (err) {
            res.render('questions/new', {
                title: 'New Question',
                question: question,
                errors: tools.errors(err.errors || err)
            });
        } else {
            return res.redirect('/questions/' + question._id);
        }
    });
};

exports.show = function (req, res) {
    Question.findOne({ _id : req.params.id }, function(err, question) {
        if (err) {
            res.render('questions/show', {
                title: 'Question',
                errors: tools.errors(err.errors || err)
            });
        } else {
            res.render('questions/show', {
                title: question.title,
                question: question
            });
        }
    });
};
