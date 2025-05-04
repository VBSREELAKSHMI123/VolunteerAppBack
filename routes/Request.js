const express = require("express")
const router = express.Router()
const {handleAddRequest,handleRequestView,handleVerifyRequest,
    handleCreateRequest,handleFetchRequest} = require('../controllers/request')

router.post('/addrequest',handleAddRequest)
router.get('/rview',handleRequestView)
router.post('/verify/:id',handleVerifyRequest)
router.post('/requests',handleCreateRequest)
router.get('/requests/user/:user_id',handleFetchRequest)

module.exports=router;



