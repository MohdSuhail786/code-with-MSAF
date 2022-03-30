const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true

    },
    begin_time:{
        type: Date,
     
    },
    end_time: {
        type: Date,
        required: true
    },
    questions: {
        type: [],
        required: true
    },
    event_oraganizer: {
        type:  mongoose.Types.ObjectId,
        required:true
        
    },
});


module.exports = mongoose.model("Event",eventSchema);