const { logger } = require("./Logger")
const Query = require('../models/query')
exports.saveQuery = async (query) => {
    try {
        logger.info("Going to save query")        
        const newQuery = new Query(query)
        await newQuery.save();
        logger.info("Query saved successfully")
    } catch (err) {
        logger.error(err)
        throw err
    }
}