const router = require('express').Router()
const { compile } = require('../controllers/compilerController/compiler');
const questionController = require('../controllers/questionController/question');

router.post('/code/submit',compile)
router.get('/',(req,res)=>res.json("Welcome to coding worm"))

router.get('/question',questionController.getQuestion)
router.post('/question',questionController.addQuestion)
router.put('/question',questionController.updateQuestion)
router.delete('/question',questionController.deleteQuestion)


module.exports = router;