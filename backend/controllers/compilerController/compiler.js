const {isEmpty, validate} = require('../../middlewares/validator');
const {cExecute, cppExecute, pythonExecute, javaExecute} = require('../../services/CompilerService');
const { logger } = require('../../services/Logger');
const { fetchQuestion } = require('../../services/Question');
const { checkRecords, saveRecord } = require('../../services/RecordService');
const { fetchTestcase } = require('../../services/Testcase');
const { updateUserScore } = require('../../services/UserService');

exports.compile = async (req,res) =>{
    try {
        const {ok,error} = validate(req.body,["code","lang","problem_code"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {code,lang,problem_code,type} = req.body;
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
        if(type == null && solved) {
            const alreadySolved = await checkRecords({problemCode:problem_code,userId:req.user._id})
            if(!alreadySolved) {
                await saveRecord({problemCode:problem_code,userId:req.user._id})
                const question = await fetchQuestion(problem_code)
                await updateUserScore(req.user._id,Number(question.point))
            } 
        }
        return res.json({data:result,status:true,type,solved});
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}