const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Records = require('../models/records')
const { logger } = require("./Logger")
const { LANGUAGE_BAR_COLOR } = require('../constants')
const Question = require('../models/question')

const saveUser = async (user) => {
    try {
        logger.info(`Going to save new user : ${JSON.stringify(user)}`)
        const newUser = User(user)
        const {_id} = await newUser.save();
        logger.info(`User saved successfully`)
        return String(_id)
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

const fetchUserById = async (id) => {
    try {
        logger.info(`Going to fetch user : ${id}`)
        const user = await User.findById(id)
        logger.info(`User fetched successfully`)
        return user
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const deleteUser = async (email) => {
    try {
        logger.info(`Going to delete user : ${email}`)
        const user = await User.findOneAndDelete({email})
        logger.info(`User deleted successfully`)
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

const updatePassword = async (id,password) => {
    try {
        const hash = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password,hash)
        await User.findByIdAndUpdate(id,{password:encryptedPassword})
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const fetchTopPerformers = async () => {
    try {
        logger.info(`Going to fetch top performers`)
        const users = await User.find({role:'student'},{name:1,score:1}).sort({score: -1}).limit(5);
        logger.info(`Top performers fetched successfully`)
        return users
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const getHeatMap = async (id) => {
    try {
        logger.info(`Going to fetch heatmap by month`)
        const data = await Records.aggregate([
        {
            $match: {userId:id}
        },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                        // problemCode: "$problemCode",
                        status: "$status"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    count: 1,
                    status: "$_id.status"
                    // problemCode:"$_id.problemCode"
                }
            }
        ])
        logger.info(`heatmap by month fetched successfully`)
        let solved = [0,0,0,0,0,0,0,0,0,0,0,0]
        let unsolved = [0,0,0,0,0,0,0,0,0,0,0,0]
        data.forEach(item => {
            if(item.status) {
                solved[item.month-1] = item.count
            } else {
                unsolved[item.month-1] = item.count
            }
        })
        const attempted = solved.map((item,index) => {
            return item + unsolved[index]
        })
        console.log(solved,attempted, id)
        return {solved,attempted}
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const getCountByLanguage = async (id) => {
    try {
        logger.info(`Going to fetch recods by language`)
        let data = await Records.aggregate([
        {
            $match: {userId:id}
        },
            {
                $group: {
                    _id: {
                        language: "$language"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    count: 1,
                    language: "$_id.language"
                }
            }
        ])
        logger.info(`recods by language fetched successfully`)
        let languages = ['C','C++','Java','Python']
        let dummyLanguages = ['c','cpp','java','python']

        data = dummyLanguages.map((lang,index) => {
            let item = data.find(item => item.language === lang)
            if(item) {
                return {name:languages[index],count:item.count,color:LANGUAGE_BAR_COLOR[lang]}
            } else {
                return {name:languages[index],count:0,color:LANGUAGE_BAR_COLOR[lang]}
            }
        })
        return data
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const getCountByDifficulty = async (id) => {
    try {
        logger.info(`Going to fetch heatmap by month`)
        let data = await Records.aggregate([
        {
            $match: {$and:[{userId:id},{status:true}]}
        },
            {
                $group: {
                    _id: {
                        level: "$level"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    count: 1,
                    level: "$_id.level"
                }
            }
        ])
        logger.info(`heatmap by month fetched successfully`)
        let levels = ['Easy','Medium','Hard']
        data = levels.map((level,index) => {
            let item = data.find(item => item.level === level)
            if(item) {
                return {level,count:item.count}
            } else {
                return {level,count:0}
            }
        })
        return data
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const getRecentActivity = async (id) => {
    try {
        logger.info(`Going to fetch recent activity`)
        let records = await Records.find({userId:id},{_id:0}).sort({createdAt:-1}).limit(3)
        records = await Promise.all(records.map(async item => {
            let problem = await Question.findOne({problemCode:item.problemCode})
            const dateTimeFormat3 = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const time = dateTimeFormat3.format(item.createdAt)
            return {
                problemCode:item.problemCode,
                name:problem.name,
                language:item.language,
                status:item.status,
                level:item.level,
                time
            }
        }))
        logger.info(`Recent activity fetched successfully`)
        return records
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const getStandings = async (id) => {
    try {
        logger.info(`Going to fetch user records`)
        let standings = await User.find({role:'student'},{name:1,email:1,score:1,collegeName:1}).sort({score: -1})
        logger.info(`User records fetched successfully`)
        standings = await Promise.all(standings.map(async user => {
            let record = await Records.find({userId:user._id,status:true})
            return {
                name:user.name,
                email:user.email,
                score:user.score,
                problemSolved: record.length,
                college: user.collegeName ? user.collegeName : "--Not Linked--"
            }
        }))
        return standings
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const updateProfile = async (id,data) => {
    try {
        logger.info(`Going to update user profile`)
        return await User.findByIdAndUpdate(id,data,{new: true})
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const updateUser = async (id,data) => {
    try {
        logger.info(`Going to update user`)
        await User.findByIdAndUpdate(id,data)
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const fetchStudentsByInstitute = async (collegName) => {
    try {
        logger.info(`Going to fetch students by institute`)
        let students = await User.find({role:'student',collegeName:collegName},{name:1,email:1,score:1,collegeName:1,blocked:1,_id:1})
        logger.info(`fetched students by institute`)
        students = await Promise.all(students.map(async user => {
            let record = await Records.find({userId:user._id,status:true})
            return {
                name:user.name,
                email:user.email,
                score:user.score,
                problemSolved: record.length,
                college: user.collegeName ? user.collegeName : "--Not Linked--",
                blocked: user.blocked,
                id: user._id
            }
        }))
        return students
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    saveUser,
    fetchUser,
    updateUserScore,
    fetchTopPerformers,
    getHeatMap,
    getCountByLanguage,
    getCountByDifficulty,
    deleteUser,
    getRecentActivity,
    updateUser,
    getStandings,
    updatePassword,
    updateProfile,
    fetchUserById,
    fetchStudentsByInstitute
}