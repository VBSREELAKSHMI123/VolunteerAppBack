const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { volunteermodel } = require("../models/volunteer");
const { router } = require("../app");
const app = require("../app");
const path = require("path");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};



const handleAddVolunteer = async (req,res) =>{
    let input = req.body;
    const fullPath = input.certificate;
    const fileName = path.basename(fullPath);
    input.certificate = fileName;
    let hashpassword = await generateHashedPassword(input.password);
    input.password = hashpassword;
    let volunteer = new volunteermodel(input);
    await volunteer.save();
    res.json({ status: 'success' });
}

const handleLoginVolunteer = async (req,res)=>{
     const input = req.body;
      try {
        const volunteer = await volunteermodel.findOne({ email: input.email });
    
        if (!volunteer) {
          return res.json({ status: 'incorrect email' });
        }
    
        const isMatch = await bcrypt.compare(input.password, volunteer.password);
    
        if (!isMatch) {
          return res.json({ status: 'incorrect password' });
        }
    
        // Create a JWT token
        const token = jwt.sign({ email: input.email }, 'volunteer-app', { expiresIn: '1d' });
    
        // Send all relevant details back to the client
        return res.json({
          status: 'success',
          _id: volunteer._id,
          token,
          volunteer_name: volunteer.name,
          volunteer_email: volunteer.email,
          volunteer_phone: volunteer.phone,
          volunteer_address: volunteer.address,
          volunteer_skill: volunteer.skill,
          volunteer_age: volunteer.age,
          volunteer_gender: volunteer.gender,
          volunteer_certificate: volunteer.certificate,
          volunteer_verified: volunteer.verified,
          volunteer_available: volunteer.available // If you have this field in the schema
        });
      } catch (error) {
        console.error('Error during login:', error);
        return res.json({ status: 'error' });
      }
}


const handleSearchVolunteer = (req,res)=>{
     let input = req.body;
       volunteermodel.find(input).then((response) => {
         res.json(response);
       }).catch(() => {
         res.send('error');
       });
}

const handleDeleteVolunteer = (req,res)=>{
       const { _id } = req.body;
     
       volunteermodel.findByIdAndDelete(_id)
         .then((result) => {
           if (result) {
             res.json({ status: 'deleted', message: 'Volunteer account deleted successfully' });
           } else {
             res.json({ status: 'error', message: 'Volunteer account not found' });
           }
         })
         .catch((error) => {
           console.error('Error deleting account:', error);
           res.status(500).json({ status: 'error', message: 'Error deleting account' });
         });
}

const handleViewVolunteer = (req,res)=>{
    volunteermodel.find().then((response) => {
        res.json(response);
        console.log(response)
      }).catch(() => {
        res.json({ status: 'error' });
      });
}

const handleVerifyVolunteer = async (req,res)=>{
    const { id } = req.params;  // Extract volunteer ID from URL params
    try {
      // Find the volunteer by ID and update its 'verified' field
      const updatedVolunteer = await volunteermodel.findByIdAndUpdate(id, { verified: true }, { new: true });
  
      if (updatedVolunteer) {
        res.json({ status: 'success', message: 'Volunteer verified successfully', updatedVolunteer });
      } else {
        res.status(404).json({ status: 'error', message: 'Volunteer not found' });
      }
    } catch (error) {
      console.error('Error verifying volunteer:', error);
      res.status(500).json({ status: 'error', message: 'Error verifying volunteer' });
    }
}

const handleViewJobVolunteer = async (req,res)=>{
    try {
        const volunteer = await volunteermodel.findById(req.params._id);
        if (!volunteer) {
          return res.status(404).json({ status: 'error', message: 'Volunteer not found.' });
        }
        res.json(volunteer);
      } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
      }
}


const handleValidateVolunteer = (req,res)=>{
    const volunteerId = req.params.id;

    volunteermodel.findByIdAndUpdate(volunteerId, { isValidated: true }, { new: true })
      .then((volunteer) => {
        if (volunteer) {
          res.json({ status: 'success', message: 'Volunteer validated successfully', volunteer });
        } else {
          res.status(404).json({ status: 'error', message: 'Volunteer not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ status: 'error', message: 'Validation failed', error });
      });
}

const handleAvailabilityStatus = async (req,res)=>{
    const { id } = req.params;
    const { available } = req.body; // Expect the new availability status in the request body
  
    try {
      const updatedVolunteer = await volunteermodel.findByIdAndUpdate(
        id,
        { available: available }, // Update availability field
        { new: true }
      );
  
      if (updatedVolunteer) {
        res.json({ status: 'success', message: 'Availability updated successfully', available: updatedVolunteer.available });
      } else {
        res.status(404).json({ status: 'error', message: 'Volunteer not found' });
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      res.status(500).json({ status: 'error', message: 'Error updating availability' });
    }
}

const handleVolunteerDetails = async (req,res)=>{
    const { id } = req.params; // Volunteer ID

    try {
      const volunteer = await volunteermodel.findById(id);
      if (volunteer) {
        res.json({ status: 'success', volunteer });
      } else {
        res.status(404).json({ status: 'error', message: 'Volunteer not found' });
      }
    } catch (error) {
      console.error('Error fetching volunteer:', error);
      res.status(500).json({ status: 'error', message: 'Error fetching volunteer' });
    }
}

const handleView = async (req,res)=>{
    try {
        const volunteers = await volunteermodel.find();
        res.json(volunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

const handleRateVolunteer = async (req,res)=>{
    try {
        const { userId, volunteerId, score } = req.body;
  
        if (!userId || !volunteerId || !score) {
            return res.status(400).json({ status: 'error', message: 'User ID, Volunteer ID, and rating are required' });
        }
  
        const volunteer = await volunteermodel.findById(volunteerId);
        if (!volunteer) {
            return res.status(404).json({ status: 'error', message: 'Volunteer not found' });
        }
  
        // Check if user already rated the volunteer
        const existingRating = volunteer.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            return res.status(400).json({ status: 'error', message: 'You have already rated this volunteer' });
        }
  
        // Add new rating
        volunteer.ratings.push({ userId, rating: score });
  
        // Calculate new average rating
        const totalRatings = volunteer.ratings.length;
        const sumRatings = volunteer.ratings.reduce((sum, r) => sum + r.rating, 0);
        const newAverageRating = sumRatings / totalRatings;
  
        await volunteer.save();
  
        res.status(200).json({ 
            status: 'success', 
            message: 'Rating submitted successfully', 
            newAverageRating 
        });
    } catch (error) {
        console.error('Error rating volunteer:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

const handleVolView = async (req,res)=>{
      try {
             const { id } = req.params;
     
             // Check if the ID is a valid MongoDB ObjectId
             if (!mongoose.Types.ObjectId.isValid(id)) {
                 return res.status(400).json({ status: 'error', message: 'Invalid volunteer ID' });
             }
     
             const volunteer = await volunteermodel.findById(id);
             if (!volunteer) {
                 return res.status(404).json({ status: 'error', message: 'Volunteer not found' });
             }
     
             // Calculate average rating
             const totalRatings = volunteer.ratings?.length || 0;
             const sumRatings = volunteer.ratings?.reduce((sum, r) => sum + r.rating, 0) || 0;
             const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
     
             res.status(200).json({ status: 'success', volunteer, averageRating });
         } catch (error) {
             console.error('Error fetching volunteer:', error);
             res.status(500).json({ status: 'error', message: 'Internal server error' });
         }
}

module.exports={handleAddVolunteer,handleLoginVolunteer,handleSearchVolunteer,handleDeleteVolunteer,
    handleViewVolunteer,handleVerifyVolunteer,handleViewJobVolunteer,handleValidateVolunteer,
    handleAvailabilityStatus,handleVolunteerDetails,handleView,handleRateVolunteer,handleVolView}