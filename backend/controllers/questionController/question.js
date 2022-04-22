const { CODE_TEMPLATES } = require("../../constants");
const { getUserFromAccessToken } = require("../../middlewares/auth");
const { isEmpty, validate } = require("../../middlewares/validator");
const { logger } = require("../../services/Logger");
const { saveQuestion, updateQuestion, fetchQuestions, fetchQuestion, deleteQuestion, problemOfTheDay } = require("../../services/Question");
const { fetchRecords } = require("../../services/RecordService");
const { saveTestcase, updateTestcase, fetchTestcase, deleteTestcase } = require("../../services/Testcase");

exports.addQuestion = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["name","level","problemCode","point","description","topic","testcases"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        await saveQuestion(req.body)
        const {testcases, problemCode} = req.body
        testcases.forEach(async testcase => {
            await saveTestcase({...testcase,problemCode: problemCode})
        })
        return res.status(200).json({data:"Question saved successfully",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.updateQuestion = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["_id","name","level","problemCode","point","description","topic","testcases"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        
        await updateQuestion(req.body,req.body._id)
        const {testcases} = req.body
        testcases.forEach(async testcase => {
            await updateTestcase(testcase,testcase._id)
        })
        return res.status(200).json({data:"Question updated successfully",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.getQuestion = async (req,res) => {
    try {
        const {ok,error} = validate(req.query,["problemCode"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {problemCode} = req.query
        const question = await fetchQuestion(problemCode)
        const testcases = await fetchTestcase(problemCode,"sample")
        if(!question || testcases.length == 0) {
            throw "Question not found"
        }
        return res.status(200).json({data:{question,testcases,templates:CODE_TEMPLATES},status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.deleteQuestion = async (req,res) => {
    try {
        const {ok,error} = validate(req.query,["problemCode"])
        if(!ok) {
            return res.json({data:error,status:false})
        }

        const {problemCode} = req.query
        const question = await deleteQuestion(problemCode)
        await deleteTestcase(problemCode)
        return res.status(200).json({data:"Question deleted successfully",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.getQuestions = async (req,res) => {
    try {
        let question = await fetchQuestions()
        if(!question) {
            throw "Question not found"
        }
        question = question.map(question => {
            const p = question.toObject()
            return p
        })
        const user = await getUserFromAccessToken(req.header('Authorization'));
        if(user != null) {
            const records = await fetchRecords({userId:user._id,status:true})
            question = question.map((problem => {
                const record = records.filter((record)=>{
                    return problem.problemCode === record.problemCode
                })
                const status = record.length !== 0 ? true : false;
                return {...problem,status}
            }))
        }
        question = question.map(problem => {
            const totalSubmission = problem.correctSubmission + problem.wrongSubmission;
            const accuracy = Math.ceil(problem.correctSubmission / totalSubmission * 100)
            return {...problem,submission:totalSubmission, accuracy:accuracy?accuracy:0}
        })
        return res.status(200).json({data:{question},status:true})
    } catch (err) {
        logger.error(err)
        console.log(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.problemOfTheDay = async (req,res) => {
    try {
        const question = await problemOfTheDay()
        if(!question) {
            throw "Question not found"
        }
        return res.status(200).json({data:question,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}