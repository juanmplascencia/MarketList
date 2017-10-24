let mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    price: {
        type: Number,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

mongoose.model('item', BikeSchema);