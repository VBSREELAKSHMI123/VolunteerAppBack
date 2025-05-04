const { jobmodel } = require("../models/job")
const pdf = require("html-pdf")
const PDFTemplate = require("../documents");
const { error } = require('console');



const handleJobView = (req,res)=>{
     jobmodel.find()
        .populate('assignedVolunteer', 'name') // Populate assignedVolunteer field with only the name
        .then((response) => {
          if (response.length === 0) {
            console.log('No jobs found in the database.');
          } else {
            console.log('Jobs from DB with populated volunteers:', response);
          }
          res.json(response); // Send response back to frontend
        })
        .catch((error) => {
          console.error('Error fetching jobs from DB:', error);
          res.json({ status: 'error' });
        });
}

const handleAssignedJobView = (req,res) =>{
    const { _id } = req.params;
    
      console.log('Fetching jobs for volunteer ID:', _id); // Log the volunteer ID
    
      jobmodel.find({ assignedVolunteer: _id })
        .then((response) => {
          if (response.length > 0) {
            res.json(response); // Return the jobs assigned to the volunteer
            console.log('Jobs found:', response); // Log the response to see the data
          } else {
            res.status(404).json({ status: 'error', message: 'No jobs found for this volunteer' });
          }
        })
        .catch((err) => {
          console.error('Error fetching jobs:', err); // Log the error
          res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        });
}

const handleAssignJob = async (req,res)=>{
     const { title, description, assignedVolunteer, duration, location, date } = req.body;
      try {
        const job = new jobmodel({
          title,
          description,
          assignedVolunteer,
          duration,
          location,
          date,
          status: "request"
        });
        await job.save();
        res.json({ status: 'success', job, assignedVolunteer }); // Include assignedVolunteer in the response
      } catch (error) {
        res.json({ status: 'error', message: error.message });
      }
}

const handleAcceptJob = async (req,res)=>{
    const { id } = req.params;
  const { volunteerId } = req.body; // Get the volunteer ID from the request body

  try {
    const updatedJob = await jobmodel.findByIdAndUpdate(id, { accepted: true, rejected: false }, { new: true });

    if (updatedJob) {
      res.json({ status: 'success', message: 'Job accepted successfully' });
    } else {
      res.status(404).json({ status: 'error', message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error accepting job:', error);
    res.status(500).json({ status: 'error', message: 'Error accepting job' });
  }
}

const handleRejectJob = async (req,res)=>{
    const { id } = req.params;
      const { volunteerId } = req.body; // Get the volunteer ID from the request body
    
      try {
        const updatedJob = await jobmodel.findByIdAndUpdate(id, { accepted: false, rejected: true }, { new: true });
    
        if (updatedJob) {
          res.json({ status: 'success', message: 'Job rejected successfully' });
        } else {
          res.status(404).json({ status: 'error', message: 'Job not found' });
        }
      } catch (error) {
        console.error('Error rejecting job:', error);
        res.status(500).json({ status: 'error', message: 'Error rejecting job' });
      }
}

const handleStatusChange = async (req,res)=>{
     try {
        const { status } = req.body
        const { JobId } = req.params
    
        console.log("JobId", JobId);
        console.log("status",status)
        const updateStatus = await jobmodel.findByIdAndUpdate(JobId,
          { status },
          { new: true }
        )
    
        console.log("JobId",JobId);
        console.log("updateStatus",updateStatus);
        
    
        console.log("updateStatus", updateStatus)
        if (!updateStatus) {
          return res.status(404).json({ error: "Job Id not found" })
        }
        res.status(200).json({ "status": "success", message: "Updated Successfully" })
      } catch (error) {
        res.status(500).json({ error: "Status updation failed" });
      }
}

const handleViewJobForCertificate = async (req,res)=>{
    try {
        const jobs = await jobmodel.find().populate("assignedVolunteer", "name email");
        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
      }
}

const handleCreatePdf = async (req,res)=>{
     try {
        const { jobId } = req.body; // More descriptive than just "id"
    
        if (!jobId) {
          return res.status(400).json({ error: "Job ID is required" });
        }
        // Fetch the job and populate assignedVolunteer with the name
        const job = await jobmodel.findById(jobId).populate("assignedVolunteer", "name");
    
        if (!job) {
          return res.status(404).json({ error: "Job not found" });
        }
        // Prepare certificate data
        const certificateData = {
          jobId: job._id,
          title: job.title,
          description: job.description,
          duration: job.duration,
          location: job.location,
          date: job.date,
          assignedVolunteer: job.assignedVolunteer ? job.assignedVolunteer.name : "Unknown"
        };
    
        // Generate the PDF
        pdf.create(PDFTemplate(certificateData), {}).toFile("result.pdf", (err, result) => {
          if (err) {
            console.error("PDF Generation Error:", err);
            return res.status(500).json({ error: "Error generating PDF" });
          }
          res.status(200).json({ message: "PDF created successfully", filePath: result.filename });
        });
    
      } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

const handleFetchPdf = (req,res)=>{
    res.sendFile(`${__dirname}/result.pdf`);
}


module.exports = {handleJobView,handleAssignedJobView,
    handleAssignJob,handleAcceptJob,handleRejectJob,handleStatusChange,
    handleViewJobForCertificate,handleCreatePdf,handleFetchPdf}
