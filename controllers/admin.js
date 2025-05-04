const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { adminmodel } = require("../models/admin")

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const handleAddAdmin = async (req,res)=>{
     let input = req.body;
      let hashpassword = await generateHashedPassword(input.password);
      input.password = hashpassword;
      let admin = new adminmodel(input);
      await admin.save();
      res.json({ status: 'success' });
}


const handleLoginUser = (req,res)=>{
     let input = req.body;
      adminmodel.find({ email: req.body.email }).then((response) => {
        if (response.length > 0) {
          let dbpsw = response[0].password;
          bcrypt.compare(input.password, dbpsw, (error, isMatch) => {
            if (isMatch) {
              jwt.sign({ email: input.email }, 'volunteer-app', { expiresIn: '1d' }, (error, token) => {
                if (error) {
                  res.json({ status: 'unable to create token' });
                } else {
                  res.json({ status: 'success', admin_id: response[0].admin_id, token: token });
                }
              });
            } else {
              res.json({ status: 'incorrect password' });
            }
          });
        } else {
          res.json({ status: 'incorrect email' });
        }
      }).catch(() => {
        res.json({ status: 'error' });
      });
}

module.exports={handleAddAdmin,handleLoginUser}