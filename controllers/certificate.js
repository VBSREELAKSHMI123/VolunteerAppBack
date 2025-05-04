const { CertificateRequestModel } = require("../models/certificateRequest")

const handleCertificateRequest = async (req,res)=>{
    try {
        const { volunteerId, job } = req.body;
        console.log("Received request:", req.body);
    
        if (!volunteerId || !job || !job._id) {
          return res.status(400).json({ status: "error", message: "Missing required fields" });
        }
    
        // Check if the request already exists
        const existingRequest = await CertificateRequestModel.findOne({ volunteerId, jobId: job._id });
        if (existingRequest) {
          return res.status(400).json({ status: "error", message: "Certificate already requested", certificateStatus: existingRequest.status });
        }
    
        // Save certificate request with full job details
        const certificateRequest = new CertificateRequestModel({
          volunteerId,
          jobId: job._id,
          title: job.title,
          description: job.description,
          duration: job.duration,
          location: job.location,
          date: job.date,
          status: job.status || "request"
        });
    
        await certificateRequest.save();
    
        // Return response with correct status
        res.json({
          status: "success",
          message: "Certificate request submitted successfully",
          certificateStatus: certificateRequest.status // Include status in response
        });
      } catch (error) {
        console.error("Error requesting certificate:", error);
        res.status(500).json({ status: "error", message: "Failed to request certificate" });
      }
}

module.exports = {handleCertificateRequest}
