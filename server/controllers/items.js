let mongoose = require('mongoose');
let Item = mongoose.model('item');
let User = mongoose.model('users');


//text message stuff
var accountSid = 'ACa8b76e143536c63ee173ec2a5d6c1bba'; // Your Account SID from www.twilio.com/console
var authToken = '7db775e243924ae20b5f6ff420641040';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);




module.exports = {
    //method that retrieves all items
    index: function(req, res){
        Item.find({}).populate('user').exec(function(err, items){
            if(err){
                return res.json(err);
            }
            return res.json(items);
        })
    },

    //method creates new item
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
    
    //method updated item
    update: function(req, res){
        Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function(err, item){
            if(err){
                return res.json(err);
            }
            return res.json(item);
        })
    },

    //method destroys item
    destroy: function(req, res){
        Item.findByIdAndRemove(req.params.id, function(err, item){
            if(err){
                return res.json({message:"Error when deleting item"});
            }
            return res.json(item);
        })
    },

    //text
    text: function(req, res){
        client.messages.create({
            body: 'Hola Stranger, I am interested in buying your junk.',
            to: '+1'+req.params.id,  // Text this number
            from: '+14154172533' // From a valid Twilio number
        })
        .then(message => res.json(message.sid));
    }
}