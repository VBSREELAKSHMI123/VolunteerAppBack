const express = require("express")
const router = express.Router()
const {handleSubmitFeedback,handleViewFeedback} = require('../controllers/feedback')

router.post('/submit-feedback',handleSubmitFeedback)
router.get('/feedbacks',handleViewFeedback)

module.exports = router;