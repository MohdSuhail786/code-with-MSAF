const mongoose = require('mongoose');

const starterTemplateSchema = new mongoose.Schema({
        language: {
            type: String,
            required: true
        },
        starterTemplate: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("StarterTemplate",starterTemplateSchema);