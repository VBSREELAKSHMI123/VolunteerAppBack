const express = require("express")
const router = express.Router()
const {handleAddUser,handleUserLogin,handleDeleteAccount} = require('../controllers/user')

router.post('/adduser',handleAddUser)
router.post('/ulogin',handleUserLogin)
router.post('/udelete',handleDeleteAccount)

module.exports=router;