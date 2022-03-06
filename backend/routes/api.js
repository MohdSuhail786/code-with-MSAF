const router = require('express').Router()
const { compile } = require('../controllers/compilerController/compiler');
const questionController = require('../controllers/questionController/question');
const userController = require('../controllers/userController/user');

router.post('/code/submit',compile)
router.get('/',(req,res)=>res.json("Welcome to coding worm"))

router.get('/question',questionController.getQuestion)
router.post('/question',questionController.addQuestion)
router.put('/question',questionController.updateQuestion)
router.delete('/question',questionController.deleteQuestion)

router.post('/user',userController.registerStudent)
router.post('/org/user',userController.registerOrganization)

router.post(['/login','/admin/login','/org/login'],userController.login)

router.get('/verify-token',userController.verifyToken)
router.post('/refresh-token',userController.refreshToken)

module.exports = router;