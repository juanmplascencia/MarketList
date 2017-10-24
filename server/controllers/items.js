let mongoose = require('mongoose');
let Item = mongoose.model('item');
let User = mongoose.model('users');

module.exports = {
    index: function(req, res){
        Item.find({}).populate('user').exec(function(err, items){
            if(err){
                return res.json(err);
            }
            return res.json(items);
        })
    },
    create: function(req, res){
        Item.create(req.body, function(err, item){
            if(err){
                return res.json(err);
            }
            User.findByIdAndUpdate(req.body.user, { $push: { items: item._id } }, { new: true }, function(err, user){
                if(err){
                    return res.json(err);
                }
                return res.json(item)
            })
        })
    },
    update: function(req, res){
        Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function(err, item){
            if(err){
                return res.json(err);
            }
            return res.json(item);
        })
    },
    destroy: function(req, res){
        Item.findByIdAndRemove(req.params.id, function(err, item){
            if(err){
                return res.json(err);
            }
            return res.json(item);
        })
    }
}