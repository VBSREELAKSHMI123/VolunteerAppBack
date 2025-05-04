const express = require("express")
const router = express.Router()
const {handleAddVolunteer,handleLoginVolunteer,handleSearchVolunteer,handleDeleteVolunteer,
    handleViewVolunteer,handleVerifyVolunteer,handleViewJobVolunteer,handleValidateVolunteer,
    handleAvailabilityStatus,handleVolunteerDetails,handleView,handleRateVolunteer,handleVolView} = require('../controllers/volunteer')



router.post('/addvol',handleAddVolunteer);
router.post('/vlogin',handleLoginVolunteer);
router.post('/vsearch',handleSearchVolunteer);
router.post('/vdelete',handleDeleteVolunteer);
router.get('/vview',handleViewVolunteer);
router.post('/verify-volunteer/:id',handleVerifyVolunteer);
router.get('/vview/:_id',handleViewJobVolunteer);
router.post('/validate/:id',handleValidateVolunteer);
router.put('/update-availability/:id',handleAvailabilityStatus);
router.get('/volunteer/:id',handleVolunteerDetails);
router.get('/volunteers',handleView);
router.post('/rateVolunteer',handleRateVolunteer);
router.get('/volunteer/:id',handleVolView);



module.exports=router;