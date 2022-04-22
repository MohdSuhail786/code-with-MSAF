const mongoose = require('mongoose');
const { validate, isEmpty } = require("../../middlewares/validator")
const { logger } = require("../../services/Logger")
const { saveQuery } = require("../../services/QueryService")
const { fetchUser, saveUser,fetchTopPerformers, getHeatMap, getCountByLanguage, getCountByDifficulty, getRecentActivity, getStandings, updatePassword, updateProfile, deleteUser, updateUser, fetchUserById, fetchStudentsByInstitute } = require("../../services/UserService")
const {role} = require("../../config/index")
const bcrypt = require('bcryptjs')
const { verifyJWTToken, generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../services/jwtService")
const { getRank, generateVerificationCode } = require("../helper/helper")
const { RANK_COLOR } = require("../../constants")
const { sendVerificationEmail, sendQueryEmail } = require("../../services/MailService")

exports.registerStudent = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["name","email","password"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {name,email,password} = req.body
        const userByEmail = await fetchUser(email);
        if(!isEmpty(userByEmail) && userByEmail.status) {
            return res.json({data:'User already registered',status:false})
        }
        if((!isEmpty(userByEmail) && userByEmail.status == false) ) {
            await deleteUser(userByEmail.email)
        }
        const hash = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password,hash)
        const verificationCode = generateVerificationCode()
        const id = await saveUser({
            name,email,password:encryptedPassword,role: role.student,status:false,verificationCode
        })
        await sendVerificationEmail({name,email,verificationCode,id})
        return res.json({data:"Verification email has been sent.",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.registerOrganization = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["name","email","password","collegeName"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {name,email,password,collegeName} = req.body
        const userByEmail = await fetchUser(email);
        if(!isEmpty(userByEmail) && userByEmail.status) {
            return res.json({data:'User already registered',status:false})
        }
        if((!isEmpty(userByEmail) && userByEmail.status == false) ) {
            await deleteUser(userByEmail.email)
        }
        const hash = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password,hash)
        const verificationCode = generateVerificationCode()
        const id = await saveUser({
            name,email,password:encryptedPassword,role: role.organization,status:false,verificationCode,collegeName
        })
        await sendVerificationEmail({name,email,verificationCode,id})
        return res.json({data:"Verification email has been sent.",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.login = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["email","password"])
        if(!ok) {
            return res.json({data:error,statu:false})
        }
        const {email,password} = req.body
        const user = await fetchUser(email)
        if(isEmpty(user)) {
            return res.json({data:'User not found',status: false})
        }
        if(!isEmpty(user) && user.status == false) {
            return res.json({data:'User not verified',status: false})
        }
        const okPassword = await bcrypt.compare(password,user.password)
        if(!okPassword) {
            return res.json({data:'Invalid login credentials',status:false})
        }
        const payload = {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                score: user.score,
                mobile: user.mobile,
                collegeName: user.collegeName,
            }
        }
        const accessToken = generateAccessToken(payload.user)
        const refreshToken = generateRefreshToken(payload.user)
        return res.json({data:{user:payload.user,accessToken,refreshToken},status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.verifyToken = async (req,res) => {
    try {
        const _accessToken = req.header('Authorization')
        const data = verifyJWTToken(_accessToken)
        if(!data) {
            return res.json({status:'unauthorized'})
        }
        const payload = {
            user: {
                _id: data.user._id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                score: data.user.score,
                mobile: data.user.mobile,
                collegeName: data.user.collegeName,
            }
        }
        return res.json({data:{user:payload.user},status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:'unauthorized'})
    }
}

exports.refreshToken = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["token"])
        if(!ok) {
            return res.json({data:error,status:'unauthorized'})
        }
        const {token} = req.body
        const data = verifyRefreshToken(token)
        if(!data) {
            return res.json({status:'unauthorized'})
        }
        const payload = {
            user: {
                _id: data.user._id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            }
        }
        const accessToken = generateAccessToken(data.user)
        const refreshToken = generateRefreshToken(data.user)
        return res.json({data:{user:payload.user,accessToken,refreshToken},status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:'unauthorized'})
    }
}

exports.topPerformers = async (req,res) => {
    try {
        let users = await fetchTopPerformers()
        users = users.map(user => {
            const rank = getRank(user.score)
            return {
                name: user.name,
                score: user.score,
                rank: rank,
                rank_color: RANK_COLOR[rank]
            }
        })

        return res.json({data:users,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.heatMap = async (req,res) => {
    try {
        console.log(req.user)
        const {solved,attempted} = await getHeatMap(req.user._id)
        res.json({labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],solved,attempted})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.userRating = async (req,res) => {
    try {
        const user = await fetchUser(req.user.email)
        const rank = getRank(user.score)
        const rankColor = RANK_COLOR[rank]
        res.json({rank,rankColor,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.languageRecords = async (req,res) => {
    try {
        const data = await getCountByLanguage(req.user._id)
        res.json({data,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.questionByDifficulty = async (req,res) => {
    try {
        const data = await getCountByDifficulty(req.user._id)
        res.json({data,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.recentActivity = async (req,res) => {
    try {
        const data = await getRecentActivity(req.user._id)
        res.json({data,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.standings = async (req,res) => {
    try {
        const data = await getStandings(req.user._id)
        res.json({data,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.changePassword = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["oldPassword","newPassword"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {oldPassword,newPassword} = req.body
        const user = await fetchUser(req.user.email)
        if(isEmpty(user)) {
            return res.json({data:'User not found',status:false})
        }
        const okPassword = await bcrypt.compare(oldPassword,user.password)
        if(!okPassword) {
            return res.json({data:'Old password donot match',status:false})
        }
        await updatePassword(user._id,newPassword)
        return res.json({data:'Password changed successfully',status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.updateUserProfile = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["name","email"])
        if(!ok) {
            return res.json({message:error,status:false})
        }
        const {name,email,mobile,collegeName} = req.body
        let user = await fetchUser(req.user.email)
        if(isEmpty(user)) {
            return res.json({message:'User not found',status:false})
        }
        user = await updateProfile(user._id,{name,mobile,collegeName})
        const payload = {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                score: user.score,
                mobile,
                collegeName
            }
        }
        const accessToken = generateAccessToken(payload.user)
        const refreshToken = generateRefreshToken(payload.user)
        return res.json({data:{user:payload.user,accessToken,refreshToken},message:'Profile updated successfully',status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({message:err,status:false})
    }
}

exports.verifyUser = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["id","verificationCode"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {id,verificationCode} = req.body
        const user = await fetchUserById(id)
        if(isEmpty(user)) {
            return res.json({data:'User not found',status:false})
        }
        
        if(user.verificationCode !== verificationCode) {
            return res.json({data:'Verification code is not valid',status:false})
        }
        await updateUser(id,{status:true})
        return res.json({data:'User verified successfully',status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.askQuery = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["query"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {query} = req.body
        const user = await fetchUser(req.user.email)
        if(isEmpty(user)) {
            return res.json({data:'User not found',status:false})
        }
        await saveQuery({name:user.name,email:user.email,query,status:'active'})
        sendQueryEmail({username:user.name,userEmail:user.email,query})
        return res.json({data:'Query submitted successfully',status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.instituteStudents = async (req,res) => {
    try {
        const institute = await fetchUserById(req.user._id)
        if(isEmpty(institute)) {
            return res.json({data:'Institute not found',status:false})
        }
        const {collegeName} = institute
        const students = await fetchStudentsByInstitute(collegeName)
        return res.json({data:students,status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.unBlockUser = async (req,res) => {
    try {
        if(req.user.role !== 'organization') {
            return res.json({data:'You are not authorized to perform this action',status:false})
        }
        const {id} = req.params
        const user = await fetchUserById(id)
        if(isEmpty(user)) {
            return res.json({data:'User not found',status:false})
        }
        await updateUser(id,{blocked:false})
        return res.json({data:'User unBlocked successfully',status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.blockUser = async (req,res) => {
    try {
        if(req.user.role !== 'organization') {
            return res.json({data:'You are not authorized to perform this action',status:false})
        }
        const {id} = req.params
        const user = await fetchUserById(id)
        if(isEmpty(user)) {
            return res.json({data:'User not found',status:false})
        }
        await updateUser(id,{blocked:true})
        return res.json({data:'User blocked successfully',status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}
