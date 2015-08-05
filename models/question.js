"use strict";

var mongoose = require('mongoose');
var config = require('config');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    title: {type : String, default : '', trim : true},
    body: {type : String, default : '', trim : true},
    username: {type : String, default : '', trim : true},
    answers: [{
        body: { type : String, default : '', trim : true },
        username: {type : String, default : '', trim : true},
        createdAt: { type : Date, default : Date.now }
    }],
    createdAt  : {type : Date, default : Date.now}
});


QuestionSchema.path('title').required(true, 'Title cannot be blank');
QuestionSchema.path('body').required(true, 'Body cannot be blank');
QuestionSchema.path('username').required(true, 'Username cannot be blank');
QuestionSchema.path('answers').schema.path('username').required(true, 'Username cannot be blank');
QuestionSchema.path('answers').schema.path('body').required(true, 'Body cannot be blank');

QuestionSchema.methods = {

    addAnswer: function (username, body, cb) {
        this.answers.push({
            body: body,
            username: username
        });

        this.save(cb);
    }
}

mongoose.model('Question', QuestionSchema);
