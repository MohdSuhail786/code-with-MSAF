const router = require('express').Router()
const { compile } = require('../controllers/compilerController/compiler');

router.post('/code/submit',compile)


module.exports = router;