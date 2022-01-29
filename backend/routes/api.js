const router = require('express').Router()
const { compile } = require('../controllers/compilerController/compiler');

router.post('/code/submit',compile)
router.get('/',(req,res)=>res.json("Welcome to coding worm"))


module.exports = router;