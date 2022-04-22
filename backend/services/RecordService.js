const { logger } = require('./Logger');
const Record = require("../models/records");
const { isEmpty } = require('../middlewares/validator');

const checkRecords = async ({problemCode,userId,status}) => {
    try {
        const record = await Record.findOne({$and:[{userId},{problemCode},{status}]})
        if(isEmpty(record)) {
            return false
        }
        return true
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const saveRecord = async (record) => {
    try {
        let newRecord = Record(record)
        newRecord = await newRecord.save();
    } catch (err) {
        logger.error(err)
        throw err;
    }
}

const fetchRecords = async ({userId,status}) => {
    try {
        console.log(userId)
        const record = await Record.find({userId,status})
        return record
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    checkRecords,
    saveRecord,
    fetchRecords
}