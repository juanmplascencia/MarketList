var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    user_name: { type: String },
    email: { type: String, unique = true },
    password: { type: String }
}, {timestamps: true});

var User = mongoose.model('users', UserSchema);
module.exports = User;