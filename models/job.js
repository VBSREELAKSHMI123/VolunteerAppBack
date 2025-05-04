const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'volunteers', required: true }, // Change this to 'volunteers'
  duration: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  accepted: { type: Boolean, default: false }, 
  rejected: { type: Boolean, default: false },
  status: { type: String, enum: ["request", "pending", "verified"]},
}, { timestamps: true });

const jobmodel = mongoose.model("jobs", schema);
module.exports = { jobmodel };
