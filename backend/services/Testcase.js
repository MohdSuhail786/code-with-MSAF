const Testcase = require('../models/testcase');
const { logger } = require('./Logger');

const saveTestcase = async (testcase) => {
    try {
        logger.info(`Going to save new Testcase : ${JSON.stringify(testcase)}`)
        const newTestcase = Testcase(testcase)
        await newTestcase.save();
        logger.info(`Testcase saved successfully`)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const updateTestcase = async (testcase,id) => {
    try {
        logger.info(`Going to update testcase : id = ${id} new testcase = ${JSON.stringify(testcase)}`)
        await Testcase.findByIdAndUpdate(id,testcase)
        logger.info(`Testcase updated successfully`)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const fetchTestcase = async (problemCode) => {
    try {
        logger.info(`Going to fetch testcase : id = ${problemCode}`)
        const testcase = await Testcase.find({problemCode})
        logger.info(`Testcase fetched successfully`)
        return testcase
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const deleteTestcase = async (problemCode) => {
    try {
        logger.info(`Going to delete testcase : id = ${problemCode}`)
        await Testcase.deleteMany({problemCode})
        logger.info(`Testcase deleted successfully`)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    saveTestcase,
    updateTestcase,
    fetchTestcase,
    deleteTestcase
}