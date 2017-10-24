var mongoose = require('mongoose');
var User = mongoose.model('users');
var path = require('path');

module.exports = {
    //Retrieve all Users in our db
    showAll: (req,res,next) => {
        User.find({}, (err, result) => {
            if(err) { 
                res.json(err);
            } else {
                res.json(results);
            }
        });
    },
    //Create a new User
    create: (req,res,next) => {
        var user = new User(req.body);
        user.save((err, result) => {
            if(err) { 
                res.json(err);
            } else {
                res.json(result);
            }
        });
    },
    //Remove User from db
    remove: (req,res,next) => {
        User.remove({_id: req.params.id}, (err, result) => {
            if(err) { 
                res.json(err);
            } else {
                res.json({message:"Delete Success"});
            }
        });
    },
    //Update a users info
    update: (req, res) => {
        User.findOne({_id: req.params.id}, (err, result) => {
            if(result){
                for(let val in req.body){
                    result[val] = req.body[val];
                }
                result.save((err,result) => {
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json(result)
                    }
                })
            }
            else{
                res.json(err)
            }
        });
    }
}