const { validate, isEmpty } = require("../../middlewares/validator")
const { logger } = require("../../services/Logger")
const { fetchUser, saveUser } = require("../../services/UserService")
const {role} = require("../../config/index")
const bcrypt = require('bcryptjs')
const { verifyJWTToken, generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../services/jwtService")

exports.registerStudent = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["name","email","password"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {name,email,password} = req.body
        if(!isEmpty(await fetchUser(email)) || !isEmpty(await fetchUser(name))) {
            return res.json({data:'User already registered',status:false})
        }
        const hash = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password,hash)
        await saveUser({
            name,email,password:encryptedPassword,role: role.student
        })
        return res.json({data:"User registered successfully",status:true})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}

exports.registerOrganization = async (req,res) => {
    try {
        const {ok,error} = validate(req.body,["name","email","password"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
        const {name,email,password} = req.body
        if(!isEmpty(await fetchUser(email)) || !isEmpty(await fetchUser(name))) {
            return res.json({data:'User already registered',status:false})
        }
        const hash = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password,hash)
        await saveUser({
            name,email,password:encryptedPassword,role: role.organization
        })
        return res.json({data:"User registered successfully",status:true})
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
        const okPassword = await bcrypt.compare(password,user.password)
        if(!okPassword) {
            return res.json({data:'Invalid login credentials',status:false})
        }
        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
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
                id: data.user._id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role
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
                id: data.user._id,
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