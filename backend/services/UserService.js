const User = require('../models/user')
const { logger } = require("./Logger")

const saveUser = async (user) => {
    try {
        logger.info(`Going to save new user : ${JSON.stringify(user)}`)
        const newUser = User(user)
        await newUser.save();
        logger.info(`User saved successfully`)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const fetchUser = async (email) => {
    try {
        logger.info(`Going to fetch user : ${email}`)
        const user = await User.findOne({email})
        logger.info(`User fetched successfully`)
        return user
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const updateUserScore = async (id,amount) => {
    try {
        const user = await User.findById(id);
        user.score += amount;
        await user.save();
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    saveUser,
    fetchUser,
    updateUserScore,
}