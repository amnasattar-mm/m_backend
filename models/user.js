const mongoose = require('mongoose');
const User = new mongoose.Schema({

    name: {
        type: String,
        // required: true
    },

    email: {
        type: String,
        // required: true
    },

    contact: {
        type: String,
        // required: true
    },

    password: {
        type: String,
        // required: true
    },

    address: {
        type: String,
        // required: true
    },
    created_at: {
        type : Date,
        default: Date.now() 

    }

})

const Users = mongoose.model('users' , User);
module.exports = Users