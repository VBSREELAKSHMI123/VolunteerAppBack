const mongoose = require("mongoose");

const certificateRequestSchema = new mongoose.Schema(
  {
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "volunteers", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "jobs", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["request", "pending", "verified"], default: "request"},
  },
  { timestamps: true }
);

const CertificateRequestModel = mongoose.model("certificate_requests", certificateRequestSchema);
module.exports = { CertificateRequestModel };
