const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true
        },
        point: {
            type: String,
            required: true
        },
        topic: {
            type: Array,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        problemCode: {
            type: String,
            required: true
        },
        task: String,
        hint: String,
        note: String,
        expectedTimeComplexity: String,
        expectedAuxiliarySpace: String,
        constraints: Array,
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("Question",questionSchema);