const { isEmpty, validate } = require("../../middlewares/validator");
const { logger } = require("../../services/Logger");
const { saveQuestion, updateQuestion, fetchQuestion, deleteQuestion } = require("../../services/Question");
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
        const testcases = await fetchTestcase(problemCode)
        if(!question || testcases.length == 0) {
            throw "Question not found"
        }
        const template = `
        #include<iostream>
        using namespace std;

        int main() {
            // write your code here
            return 0;
        }
        `
        return res.status(200).json({data:{question,testcases,template},status:true})
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