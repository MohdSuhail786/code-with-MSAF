const {isEmpty, validate} = require('../../middlewares/validator');
const {cExecute, cppExecute, pythonExecute, javaExecute} = require('../../services/CompilerService');
const { logger } = require('../../services/Logger');

exports.compile = async (req,res) =>{
    try {
        const {ok,error} = validate(req.body,["code","lang","input"])
        if(!ok) {
            return res.json({data:error,status:false})
        }
    
        const {code,input,lang} = req.body;
        console.log(code,input,lang)
        let output = {};
        switch(lang) {
            case 'c': output = await cExecute(code,input); break;
            case 'cpp': output = await cppExecute(code,input); break;
            case 'python': output = await pythonExecute(code,input); break;
            case 'java': output = await javaExecute(code,input); break;
            default: output={err:true,error:"language not defined"}
        }
        return res.json({data:output,status:true});
    } catch (err) {
        logger.error(err)
        return res.status(500).json({data:err,status:false})
    }
}