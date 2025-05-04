const express = require("express")
const router = express.Router()

const {handleCertificateRequest} = require('../controllers/certificate')

router.post('/request-certificate',handleCertificateRequest)

module.exports = router;