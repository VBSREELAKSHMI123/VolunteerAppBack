const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { usermodel } = require("../models/user")

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const handleAddUser = async (req,res)=>{
      let input = req.body;
      let hashpassword = await generateHashedPassword(input.password);
      input.password = hashpassword;
      let user = new usermodel(input);
      await user.save();
      res.json({ status: 'success' });
}

const handleUserLogin = async (req,res)=>{
      const { email, password } = req.body;
    
      try {
        const response = await usermodel.findOne({ email });
        if (!response) {
          return res.json({ status: 'incorrect email' });
        }
    
        const isMatch = await bcrypt.compare(password, response.password);
        if (isMatch) {
          const token = jwt.sign({ email }, 'volunteer-app', { expiresIn: '1d' });
    
          // Send additional user details in the response
          return res.json({
            status: 'success',
            user_id: response._id,
            token,
            user_name: response.name,
            email: response.email,
            phone: response.phone,
            address: response.address
          });
        } else {
          return res.json({ status: 'incorrect password' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.json({ status: 'error', message: 'An error occurred during login.' });
      }
}

const handleDeleteAccount = (req,res)=>{
    const { _id } = req.body;
      usermodel.findByIdAndDelete(_id)
        .then((response) => {
          if (response) {
            res.json({ status: "deleted" });
          } else {
            res.json({ status: "failed" });
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          res.json({ status: "error" });
        });
}

module.exports = {handleAddUser,handleUserLogin,handleDeleteAccount}