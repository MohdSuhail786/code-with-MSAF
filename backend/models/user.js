const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    score: {
        type: Number,
        default: 0
    },
    verificationCode: String,
    status: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});


module.exports = mongoose.model("User",userSchema);