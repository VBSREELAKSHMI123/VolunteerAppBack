const express = require("express")
const router = express.Router()
const {handleJobView,handleAssignedJobView,
    handleAssignJob,handleAcceptJob,handleRejectJob,handleStatusChange,
    handleViewJobForCertificate,handleCreatePdf,handleFetchPdf} = require("../controllers/job")



router.get('/jobview',handleJobView)
router.get('/jview/:_id',handleAssignedJobView)
router.post('/assignjob',handleAssignJob)
router.put('/accept-job/:id',handleAcceptJob)
router.put('/reject-job/:id',handleRejectJob)
router.patch('/status-change/:JobId',handleStatusChange)
router.get('/view-jobs',handleViewJobForCertificate)
router.post('/create-pdf',handleCreatePdf)
router.get('/fetch-pdf',handleFetchPdf)


module.exports=router;