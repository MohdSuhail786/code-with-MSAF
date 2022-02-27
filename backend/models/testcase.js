const mongoose = require('mongoose');

const testcaseSchema = new mongoose.Schema({
        problemCode: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        description: String,
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("Testcase",testcaseSchema);