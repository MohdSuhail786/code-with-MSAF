const { isEmpty, validate } = require("../../middlewares/validator");
const eventModel = require("../../models/event");
const { getEvent, fetchEvent } = require("../../services/EventService");
const { logger } = require("../../services/Logger");
const { fetchQuestion } = require("../../services/Question");
const { fetchUserById } = require("../../services/UserService");

const getDate = async()=>{
    let date = new Date();
    let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000;
    let ISTTime = new Date(date.getTime()+offset);
    return ISTTime;
    
}

exports.addEvent = async (req,res) => {
    try {
        console.log("event call")
        const {ok,error} = validate(req.body,["event_name","begin_time","end_time","questions","event_oraganizer"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const data = await eventModel.create(req.body);
        return res.status(200).json({data:"Event saved successfully",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}


exports.getEvent = async (req,res) => {
    try {
         const {name} = req.query
         // todo: check if user is allowed to access this event
         let event = await fetchEvent({name})
         if(!event) {
             return res.status(500).json({data:"Event not found",status:false})
         }
         console.log("TIming ")
         const currentDate = new Date()
         let counter_heading = "Starts In"
         let remaining_time = Math.abs((currentDate.getTime() - event.begin_time.getTime()) / 1000);
         if(currentDate >= event.begin_time && currentDate <= event.end_time) {
            counter_heading = "Ends In"
            remaining_time = Math.abs((currentDate.getTime() - event.end_time.getTime()) / 1000);
         }
         if(currentDate > event.end_time) {
             counter_heading = "Event Completed!"
             remaining_time = 0
         }
         console.log(counter_heading,remaining_time, "TIming")
         event['questions'] = await Promise.all(event.questions.map(async problemCode => 
             {

                 const question =  await fetchQuestion(problemCode)
                 const correctSubmission = event.submissions.filter(submission => (submission.problemCode === problemCode && submission.status)).length;
                 const inCorrectSubmission = event.submissions.filter(submission => (submission.problemCode === problemCode && submission.status == false)).length;
                 let successRate = correctSubmission/(inCorrectSubmission + correctSubmission) * 100;
                 successRate = Number.isNaN(successRate) ? 0 : successRate
                 successRate = successRate.toFixed(2)
                 const solved = event.submissions.filter(submission => (submission.problemCode === problemCode && submission.userId === req.user._id && submission.status)).length == 0? false:true
                 return {...question.toObject(),correctSubmission,inCorrectSubmission,successRate,solved}
            }
         ))
         const eventOrganizer = await fetchUserById(event.event_organizer)
         return res.status(200).json({data:{...event.toObject(),event_organizer_name: eventOrganizer.collegeName,counter_heading,remaining_time},status:true})
    } catch (err) {
        logger.error(err)
        console.log(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.updateEvent = async (req,res) => {
    try {
        // const {userId} = req.user;
        const eventId = req.query.id;
        const data = await eventModel.findByIdAndUpdate({_id:eventId},req.body,{new:true});
         return res.status(200).json({data,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.deleteEvent = async (req,res) => {
    try {
         const eventId = req.query.id;
         const data = await eventModel.findByIdAndDelete({_id:eventId});
         return res.status(200).json({data:"Event delete successfully",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.upcomingEvent = async(req,res)=>{
    try{
        let ISTTime = await getDate()
        const data = await eventModel.find({begin_time:{$gt:ISTTime}}).limit(5);
        return res.status(200).json({data,status:true})
    }catch(err){
        console.log(err)
        logger.error(err);
        return res.status(500).json({data:err,status:false})
    }
}

exports.previousEvent = async(req,res)=>{
    try{
        let ISTTime = await getDate()
        const data = await eventModel.find({begin_time:{$lt:ISTTime}}).limit(5)
        console.log(data);
        return res.status(200).json({data,status:true})
    }catch(err){
        console.log(err)
        logger.error(err);
        return res.status(500).json({data:err,status:false})
    }
}

exports.onGoingEvent = async(req,res)=>{
    try{
        let ISTTime = await getDate()
        const data = await eventModel.find({$and:[{begin_time:{$gte:ISTTime}},{end_time:{$lte:ISTTime}}]}).limit(5);
        return res.status(200).json({data,status:true})
    }catch(err){
        console.log(err)
        logger.error(err);
        return res.status(500).json({data:err,status:false})
    }
}