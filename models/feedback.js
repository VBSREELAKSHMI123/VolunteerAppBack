const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usermodel', required: true }, // Reference to usermodel
  content: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const feedbackmodel = mongoose.model("feedback", feedbackSchema);
module.exports = { feedbackmodel }
