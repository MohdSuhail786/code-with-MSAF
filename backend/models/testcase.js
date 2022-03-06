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
            type: Array,
            required: true
        },
        output: {
            type: Array,
            required: true
        },
        description: String,
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("Testcase",testcaseSchema);