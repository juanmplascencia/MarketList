var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    user_name: { type: String },
    phone: { type: Number },
    email: { type: String, unique: true },
    password: { type: String },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
     }]
}, {timestamps: true});

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
})

UserSchema.methods.authenticate = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('users', UserSchema);
module.exports = User;