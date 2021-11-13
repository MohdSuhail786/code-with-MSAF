const {isEmpty} = require('../../middlewares/validator');
const {cExecute, cppExecute, pythonExecute, javaExecute} = require('../../services/CompilerService');

exports.compile = async (req,res) =>{
    const validationError = [];
    if(isEmpty(req.body.code)) validationError.push("Code cannot be empty");
    if(isEmpty(req.body.lang)) validationError.push("Language cannot be empty");
    if(isEmpty(req.body.input)) validationError.push("Input cannot be empty");
    
    if(validationError.length) {
        return res.json({data:validationError[0],status:false});
    }

    const {code,input,lang} = req.body;
    console.log(code,input,lang)
    let output = {};
    switch(lang) {
        case 'c': output = await cExecute(code,input); break;
        case 'cpp': output = await cppExecute(code,input); break;
        case 'python': output = await pythonExecute(code,input); break;
        case 'java': output = await javaExecute(code,input); break;
        default: output={errr:true,error:"language not defined"}
    }
    return res.json(output);
}