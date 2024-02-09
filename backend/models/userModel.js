const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name: String,
    username: String,
    password: String
    });

    module.export = mongoose.model('user', userSchema);
