
var path = require('path');

module.exports = {
    db: process.env['MONGOLAB_URI'] ? process.env['MONGOLAB_URI'] : 'mongodb://localhost/qa_service',
    root: path.join(__dirname, '..'),
};
