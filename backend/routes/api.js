const router = require('express').Router()
const { compile } = require('../controllers/compilerController/compiler');
const questionController = require('../controllers/questionController/question');
const userController = require('../controllers/userController/user');
const { auth } = require('../middlewares/auth');
const eventController = require('../controllers/eventController/event');

router.post('/code/submit',auth,compile)
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

router.post('/event',eventController.addEvent);
router.get('/event',eventController.getEvent);
router.put('/event',eventController.updateEvent);
router.delete('/event',eventController.deleteEvent);
router.get('/upcomingEvent',eventController.upcomingEvent);
router.get('/previousEvent',eventController.previousEvent);
router.get('/onGoingEvent',eventController.onGoingEvent);

module.exports = router;