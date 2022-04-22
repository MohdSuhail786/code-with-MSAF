const router = require('express').Router()
const { compile } = require('../controllers/compilerController/compiler');
const questionController = require('../controllers/questionController/question');
const userController = require('../controllers/userController/user');
const { auth } = require('../middlewares/auth');
const eventController = require('../controllers/eventController/event');
const { SendTestEmail, sendEmail } = require('../services/MailService');

router.post('/code/submit',auth,compile)
router.get('/',(req,res)=>res.json("Welcome to coding worm"))

router.get('/question',questionController.getQuestion)
router.get('/top/questions',questionController.getQuestions)
router.post('/question',questionController.addQuestion)
router.put('/question',questionController.updateQuestion)
router.delete('/question',questionController.deleteQuestion)

router.post('/user',userController.registerStudent)
router.post('/verify-user',userController.verifyUser)
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

router.get('/top-performers',userController.topPerformers)
router.get('/problem-of-the-day',questionController.problemOfTheDay)
router.get('/heat-map',auth,userController.heatMap)
router.get('/user-rating',auth,userController.userRating)
router.get('/language-records',auth,userController.languageRecords)
router.get('/question-by-difficulty',auth,userController.questionByDifficulty)
router.get('/recent-activity',auth,userController.recentActivity)
router.get('/standings',auth,userController.standings)
router.get('/institute/students',auth,userController.instituteStudents)
router.post('/change-password',auth,userController.changePassword)
router.post('/update-profile',auth,userController.updateUserProfile)
router.post('/ask-query',auth,userController.askQuery)
router.put('/block-user/:id',auth,userController.blockUser)
router.put('/unblock-user/:id',auth,userController.unBlockUser)
module.exports = router;