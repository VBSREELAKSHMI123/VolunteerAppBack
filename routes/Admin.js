const express = require("express")
const router = express.Router()
const {handleAddAdmin,handleLoginUser} = require("../controllers/admin")

router.post('/addadmin',handleAddAdmin);
router.post('/alogin',handleLoginUser);

module.exports=router;