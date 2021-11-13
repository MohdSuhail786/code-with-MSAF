const {isEmpty} = require('../../middlewares/validator');
const {cExecute} = require('../../services/CompilerService');

exports.compile = async (req,res) =>{
    const validationError = [];
    if(isEmpty(req.body.code)) validationError.push("Code cannot be empty");
    if(isEmpty(req.body.lang)) validationError.push("Language cannot be empty");
    if(isEmpty(req.body.input)) validationError.push("Input cannot be empty");
    
    if(validationError.length) {
        return res.json({data:validationError[0],status:false});
    }

    const {code,input,lang} = req.body;
    console.log(code)
    const output = await cExecute(code,input);
    return res.json(output);
}