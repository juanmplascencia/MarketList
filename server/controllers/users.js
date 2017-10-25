let mongoose = require('mongoose');
let User = mongoose.model('users');
let path = require('path');

module.exports = {
    // This method finds the user in the database and if they exist, then
    // it'll log them in and store the name in session
    login: function (req, res) {
        User.findOne({name: req.body.name}, (err, user) => {
			if(err){
				return res.status(401).json(err)
			}
			else if(user){
				req.session.user = user
				res.json({user: user})
			}
		});
    },

    // This method is only run after the user is logged in.
    // Thus the name is already stored in session
    session: function (req, res) {
		if(req.session.user){
			return res.json(req.session.user);
		}
		else{
			return res.status(500).json("Not logged in")
		}
    },
    
    //method to authenticate users credentials
    authenticate: function(req, res){
        User.findOne({ email: req.body.email }, function(err, user){
            if(err){
                return res.json(err);
            }
            if(user && user.authenticate(req.body.password)){
                req.session.user_id = user._id;
                return res.json(user);
            }
            return res.json({
                errors: {
                    login: {
                        message: 'Invalid credentials'
                    }
                }
            })
        })
    },

    // this method logs out current user
    logout: function(req, res){
        if(req.session.user_id){
            delete req.session.user_id
        }
        return res.json({ status: true })
    },

    // This method grabs all the polls and sends them off
    index: function(req, res){
        User.find({}, function(err, users){
            if(err){
                return res.json(err);
            }
            return res.json(users);
        })
    },

    //this method creates a new User
    create: function(req, res){
        User.create(req.body, function(err, user){
            if(err){
                return res.json(err);
            }
            req.session.user_id = user._id;
            return res.json(user);
        })
    },

    //this method retrieves one user 
    show: function(req, res){
        User.findById(req.params.id).populate('items').exec(function(err, user){
            if(err){
                return res.json(err);
            }
            return res.json(user);
        });
    }
    
}
