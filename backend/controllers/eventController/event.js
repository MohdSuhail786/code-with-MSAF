const { isEmpty, validate } = require("../../middlewares/validator");
const eventModel = require("../../models/event")
const { logger } = require("../../services/Logger");

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
        // const {userId} = req.user;
         const userId ="62446d240e75067a8c2769da"
         const data = await eventModel.find({event_oraganizer:userId});
         return res.status(200).json({data,status:true})
    } catch (err) {
        logger.error(err)
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