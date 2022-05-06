const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async (req,res,next) => {
    let {accessToken} = req.body
    if (!accessToken) {
      accessToken = req.header('Authorization')
    }
    
    if(!accessToken) {
      return res.json({message:"Unauthorized"}).status(400);
    }
    try {
      const jwtData = await jwt.verify(accessToken,process.env.SECRET_KEY)
      if(!jwtData) {
        return res.json({message:"Unauthorized"}).status(400);
      }
      req.user = jwtData.user
      next()
    } catch(err) {
      console.log(err.message,"ABC")
      return res.json({message:"Unauthorized"}).status(400);
    }
  }

  exports.getUserFromAccessToken = async (accessToken) => {
    if(accessToken == 'undefined') return null;
    const {user} = await jwt.verify(accessToken,process.env.SECRET_KEY)
    return user;
  }