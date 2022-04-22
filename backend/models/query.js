const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});


module.exports = mongoose.model("Query",querySchema);