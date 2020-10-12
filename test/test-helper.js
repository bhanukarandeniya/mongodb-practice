const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
    .once('open', () => console.log('Mongodb Connection established successfully...'))
    .on('error', (error) => console.error('Error occurred in mongodb connection..', error));


module.exports = { mongoose }