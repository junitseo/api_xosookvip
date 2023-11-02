const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    passwordHash : {
        type: String,
        required: true,
    },
    firstname : {
        type: String,
    },
    lastname : {
        type: String,
    },
    status : {
        type: String
    },
    role: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }
   
    
}, {timestamps: true});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});


module.exports = mongoose.model('User', userSchema);