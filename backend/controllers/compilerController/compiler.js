const {isEmpty, validate} = require('../../middlewares/validator');
const {cExecute, cppExecute, pythonExecute, javaExecute} = require('../../services/CompilerService');
const { logger } = require('../../services/Logger');
const { fetchQuestion } = require('../../services/Question');
const { checkRecords, saveRecord } = require('../../services/RecordService');
const { fetchTestcase } = require('../../services/Testcase');
const { updateUserScore } = require('../../services/UserService');
const { updateQuestion } = require('../../services/Question');
const { fetchEvent } = require('../../services/EventService');

exports.compile = async (req,res) =>{
    try {
        const {ok,error} = validate(req.body,["code","lang","problem_code"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {code,lang,problem_code,type,eventName,date} = req.body;
        const testCases = await fetchTestcase(problem_code,type)
        let output = {};
        let result = [];
        let solved = true;
        for(const testCase of testCases) {
            const input = testCase.input.join("\n")
            switch(lang) {
                case 'c': output = await cExecute(code,input); break;
                case 'cpp': output = await cppExecute(code,input); break;
                case 'python': output = await pythonExecute(code,input); break;
                case 'java': output = await javaExecute(code,input); break;
                default: output={err:true,error:"language not defined"}
            }
            if(type == null){
                if(!output?.err){
                    result.push({opStatus:output.output == testCase.output})
                    if(solved) solved = output.output == testCase.output
                }
                else {
                    result.push({opStatus:false})
                    solved=false
                }
            }
            else result.push({...output,input:testCase.input,expectedOutput:testCase.output});
        }
        const question = await fetchQuestion(problem_code)
        if(type == null && !solved){
            await updateQuestion({$inc:{wrongSubmission:1}},question._id)
            await saveRecord({problemCode:problem_code,userId:req.user._id,status:false,language:lang,level:question.level})
        }
        if(type == null && solved) {
            const alreadySolved = await checkRecords({problemCode:problem_code,userId:req.user._id,status:true})
            if(!alreadySolved) {
                await saveRecord({problemCode:problem_code,userId:req.user._id,status:true,language:lang,level:question.level})
                await updateUserScore(req.user._id,Number(question.point))
                await updateQuestion({$inc:{correctSubmission:1}},question._id)
            } 
        }
        if(type == null && eventName) {
            const event = await fetchEvent({name:eventName})
            event.submissions.push({userId:req.user._id,problemCode:problem_code,problemName:question.name,user:req.user.name,email:req.user.email,status:solved,language:lang,level:question.level,date,college:req.user.collegeName})
            await event.save()
        }
        return res.json({data:result,status:true,type,solved});
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}