const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate
    },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String,
            min: 4
        }
},
{timestamps: 
true})

const User = mongoose.model('user', UserSchema);
module.exports = User;