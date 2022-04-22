const Question = require('../models/question');
const Testcase = require('../models/testcase');
const { logger } = require('./Logger');

const saveQuestion = async (question) => {
    try {
        logger.info(`Going to save new Question : ${JSON.stringify(question)}`)
        let newQuestion = Question(question)
        newQuestion = await newQuestion.save();
        logger.info(`Question saved successfully`)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const updateQuestion = async (question,id) => {
    try {
        logger.info(`Going to update question : id = ${id} new question = ${JSON.stringify(question)}`)
        const oldQuestion = await Question.findByIdAndUpdate(id,question)
        logger.info(`Question updated successfully`)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const fetchQuestion = async (problemCode) => {
    try {
        logger.info(`Going to fetch question : id = ${problemCode}`)
        const question = await Question.findOne({problemCode})
        logger.info(`Question fetched successfully`)
        return question
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const fetchQuestions = async () => {
    try {
        logger.info(`Going to fetch questions`)
        const question = await Question.find()
        logger.info(`Question fetched successfully`)
        return question
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const deleteQuestion = async (problemCode) => {
    try {
        logger.info(`Going to delete question : id = ${problemCode}`)
        const question = await Question.findOneAndDelete({problemCode})
        logger.info(`Question deleted successfully`)
        return question
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const problemOfTheDay = async () => {
    try {
        logger.info(`Going to fetch problem of the day`)
        const question = await Question.findOne({problemOfTheDay:true},{name:1,problemCode:1,_id:0})
        logger.info(`Problem of the day fetched successfully`)
        return question
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    saveQuestion,
    updateQuestion,
    fetchQuestion,
    deleteQuestion,
    fetchQuestions,
    problemOfTheDay
}