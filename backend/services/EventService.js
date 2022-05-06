const Question = require('../models/question');
const Event = require('../models/event');
const { logger } = require('./Logger');

const fetchEvent = async ({name}) => {
    try {
        logger.info(`Going to fetch event : id = ${name}`)
        const event = await Event.findOne({event_name:name})
        logger.info(`Event fetched successfully`)
        return event
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    fetchEvent
}