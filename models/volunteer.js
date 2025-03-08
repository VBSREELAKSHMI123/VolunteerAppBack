const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    certificate: String,  // This will store the image path
    skill: String,
    age: String,
    gender: String,
    phone: String,
    password: String,
    verified: { type: Boolean, default: false } , // New field for verification status
    available: { type: Boolean, default: true } ,
    certificateVerified: { type: Boolean, default: false }
});

let volunteermodel = mongoose.model("volunteers", schema);
module.exports = { volunteermodel };
