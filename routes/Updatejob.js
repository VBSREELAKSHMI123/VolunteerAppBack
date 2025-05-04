const express = require("express")
const router = express.Router()
const {handleSearchJob,handleDeleteJob,handleUpdatedView,handleAddJob} = require('../controllers/updatejob')

router.post('/jsearch',handleSearchJob)
router.post('/jdelete',handleDeleteJob)
router.get('/updatejobview',handleUpdatedView)
router.post('/addjob',handleAddJob)

module.exports = router;
