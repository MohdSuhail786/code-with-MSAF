const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        problemCode: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        language: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("Record",recordSchema);