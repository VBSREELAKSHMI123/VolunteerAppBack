const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    certificate: String,  
    skill: String,
    age: String,
    gender: String,
    phone: String,
    password: String,
    verified: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    certificateVerified: { type: Boolean, default: false },

    // Store only scores
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            rating: Number
        }
    ]
});


let volunteermodel = mongoose.model("volunteers", schema);
module.exports = { volunteermodel };
