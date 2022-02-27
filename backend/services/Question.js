const Question = require('../models/question');
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

module.exports = {
    saveQuestion,
    updateQuestion,
    fetchQuestion,
    deleteQuestion
}