const express = require('express');
const cors = require('cors');
const path = require('path');




const app = express();
app.use(cors());
app.use(express.json());


const adminRoute = require('./routes/Admin')
app.use(adminRoute)

const volunteerRoute = require('./routes/Volunteer')
app.use(volunteerRoute)

const jobRoute = require('./routes/Job')
app.use(jobRoute)

const requestRoute = require('./routes/Request')
app.use(requestRoute)

const userRoute = require('./routes/User')
app.use(userRoute)

const updateJobRoute = require('./routes/Updatejob')
app.use(updateJobRoute)

const feedbackRoute = require('./routes/Feedback')
app.use(feedbackRoute)

const certificateRoute = require('./routes/Certificate')
app.use(certificateRoute)

// To store images
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;



















// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const pdf = require("html-pdf")


// Import models
// const { volunteermodel } = require('./models/volunteer');
// const { usermodel } = require('./models/user');
// const { adminmodel } = require('./models/admin');
// const { jobmodel } = require('./models/job');
// const { requestmodel } = require('./models/request');
// const { feedbackmodel } = require('./models/feedback');
// const { updatejobmodel } = require('./models/updatejob');
// const { CertificateRequestModel } = require('./models/certificateRequest');

//Import the PDF template function
// const PDFTemplate = require("./documents");
// const { error } = require('console');

// mongoose.connect('mongodb+srv://sree:sree2002@cluster0.n63e6.mongodb.net/volunteerdb?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// CREATE PDF pasted
// app.post("/create-pdf", async (req, res) => {
//   try {
//     const { jobId } = req.body; // More descriptive than just "id"

//     if (!jobId) {
//       return res.status(400).json({ error: "Job ID is required" });
//     }
//     // Fetch the job and populate assignedVolunteer with the name
//     const job = await jobmodel.findById(jobId).populate("assignedVolunteer", "name");

//     if (!job) {
//       return res.status(404).json({ error: "Job not found" });
//     }
//     // Prepare certificate data
//     const certificateData = {
//       jobId: job._id,
//       title: job.title,
//       description: job.description,
//       duration: job.duration,
//       location: job.location,
//       date: job.date,
//       assignedVolunteer: job.assignedVolunteer ? job.assignedVolunteer.name : "Unknown"
//     };

//     // Generate the PDF
//     pdf.create(PDFTemplate(certificateData), {}).toFile("result.pdf", (err, result) => {
//       if (err) {
//         console.error("PDF Generation Error:", err);
//         return res.status(500).json({ error: "Error generating PDF" });
//       }
//       res.status(200).json({ message: "PDF created successfully", filePath: result.filename });
//     });

//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// // app.post("/create-pdf", async (req, res) => {
// //   const certificateRequests = await jobmodel.findById(req.body)
// //   // Generate a PDF using the provided data and the template
// //   pdf.create(PDFTemplate(certificateRequests), {}).toFile("result.pdf", (err) => {
// //     if (err) {
// //       res.send(Promise.reject()); // If an error occurs, reject the request
// //     }

// //     res.send(Promise.resolve()); // If successful, send a resolved promise
// //   });
// // });


// /**
//  * GET - Fetch the generated PDF  pasted
//  * This route sends the generated PDF file to the client for download.
//  */
// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);  // Sends the generated PDF file
// });

// // Utility function for password hashing
// const generateHashedPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// };

// // ADD VOLUNTEER pasted to routes
// app.post('/addvol', async (req, res) => {
//   let input = req.body;
//   const fullPath = input.certificate;
//   const fileName = path.basename(fullPath);
//   input.certificate = fileName;
//   let hashpassword = await generateHashedPassword(input.password);
//   input.password = hashpassword;
//   let volunteer = new volunteermodel(input);
//   await volunteer.save();
//   res.json({ status: 'success' });
// });

// // ADD USER pasted
// app.post('/adduser', async (req, res) => {
//   let input = req.body;
//   let hashpassword = await generateHashedPassword(input.password);
//   input.password = hashpassword;
//   let user = new usermodel(input);
//   await user.save();
//   res.json({ status: 'success' });
// });

// // // ADD ADMIN  pasted to controller
// // app.post('/addadmin', async (req, res) => {
// //   let input = req.body;
// //   let hashpassword = await generateHashedPassword(input.password);                  
// //   input.password = hashpassword;
// //   let admin = new adminmodel(input);
// //   await admin.save();
// //   res.json({ status: 'success' });
// // });


// // ADD JOB pasted to routes
// app.post("/addjob", (req, res) => {
//   let input = req.body
//   let updatejob = new updatejobmodel(input)
//   updatejob.save()
//   res.json({ "status": "success" })
// });

// // ADD REQUEST pasted
// app.post("/addrequest", async (req, res) => {
//   const { user_id, name, description, phone, duration } = req.body; // Destructure the necessary fields

//   try {
//     // Create a new request using the input data, including user_id
//     const request = new requestmodel({
//       user_id, // Include the user ID from the request data
//       name,
//       description,
//       phone,
//       duration,
//     });

//     // Save the request to the database
//     await request.save();

//     // Send a success response
//     res.json({ "status": "success" });
//   } catch (error) {
//     console.error('Error adding request:', error);
//     res.status(500).json({ "status": "error", "message": "Failed to add request" });
//   }
// });


// // VOLUNTEER LOGIN pasted to routes
// app.post('/vlogin', async (req, res) => {
//   const input = req.body;
//   try {
//     const volunteer = await volunteermodel.findOne({ email: input.email });

//     if (!volunteer) {
//       return res.json({ status: 'incorrect email' });
//     }

//     const isMatch = await bcrypt.compare(input.password, volunteer.password);

//     if (!isMatch) {
//       return res.json({ status: 'incorrect password' });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ email: input.email }, 'volunteer-app', { expiresIn: '1d' });

//     // Send all relevant details back to the client
//     return res.json({
//       status: 'success',
//       _id: volunteer._id,
//       token,
//       volunteer_name: volunteer.name,
//       volunteer_email: volunteer.email,
//       volunteer_phone: volunteer.phone,
//       volunteer_address: volunteer.address,
//       volunteer_skill: volunteer.skill,
//       volunteer_age: volunteer.age,
//       volunteer_gender: volunteer.gender,
//       volunteer_certificate: volunteer.certificate,
//       volunteer_verified: volunteer.verified,
//       volunteer_available: volunteer.available // If you have this field in the schema
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.json({ status: 'error' });
//   }
// });


// // USER LOGIN pasted
// app.post('/ulogin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const response = await usermodel.findOne({ email });
//     if (!response) {
//       return res.json({ status: 'incorrect email' });
//     }

//     const isMatch = await bcrypt.compare(password, response.password);
//     if (isMatch) {
//       const token = jwt.sign({ email }, 'volunteer-app', { expiresIn: '1d' });

//       // Send additional user details in the response
//       return res.json({
//         status: 'success',
//         user_id: response._id,
//         token,
//         user_name: response.name,
//         email: response.email,
//         phone: response.phone,
//         address: response.address
//       });
//     } else {
//       return res.json({ status: 'incorrect password' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.json({ status: 'error', message: 'An error occurred during login.' });
//   }
// });



// // ADMIN LOGIN  pasted to controller
// app.post('/alogin', (req, res) => {
//   let input = req.body;
//   adminmodel.find({ email: req.body.email }).then((response) => {
//     if (response.length > 0) {
//       let dbpsw = response[0].password;
//       bcrypt.compare(input.password, dbpsw, (error, isMatch) => {
//         if (isMatch) {
//           jwt.sign({ email: input.email }, 'volunteer-app', { expiresIn: '1d' }, (error, token) => {
//             if (error) {
//               res.json({ status: 'unable to create token' });
//             } else {
//               res.json({ status: 'success', admin_id: response[0].admin_id, token: token });
//             }
//           });
//         } else {
//           res.json({ status: 'incorrect password' });
//         }
//       });
//     } else {
//       res.json({ status: 'incorrect email' });
//     }
//   }).catch(() => {
//     res.json({ status: 'error' });
//   });
// });


// // SEARCH VOLUNTEER pasted to routes
// app.post('/vsearch', (req, res) => {
//   let input = req.body;
//   volunteermodel.find(input).then((response) => {
//     res.json(response);
//   }).catch(() => {
//     res.send('error');
//   });
// });


// // SEARCH JOB pasted
// app.post('/jsearch', (req, res) => {
//   let input = req.body;
//   updatejobmodel.find(input).then((response) => {
//     res.json(response);
//   }).catch(() => {
//     res.send('error');
//   });
// });


// // DELETE VOLUNTEER pasted to routes
// app.post('/vdelete', (req, res) => {
//   const { _id } = req.body;

//   volunteermodel.findByIdAndDelete(_id)
//     .then((result) => {
//       if (result) {
//         res.json({ status: 'deleted', message: 'Volunteer account deleted successfully' });
//       } else {
//         res.json({ status: 'error', message: 'Volunteer account not found' });
//       }
//     })
//     .catch((error) => {
//       console.error('Error deleting account:', error);
//       res.status(500).json({ status: 'error', message: 'Error deleting account' });
//     });
// });


// // DELETE USER ACCOUNT pasted
// app.post("/udelete", (req, res) => {
//   const { _id } = req.body;
//   usermodel.findByIdAndDelete(_id)
//     .then((response) => {
//       if (response) {
//         res.json({ status: "deleted" });
//       } else {
//         res.json({ status: "failed" });
//       }
//     })
//     .catch((error) => {
//       console.error("Error deleting user:", error);
//       res.json({ status: "error" });
//     });
// });


// // DELETE JOB  pasted
// app.post("/jdelete", (req, res) => {
//   const { _id } = req.body;
//   updatejobmodel.findByIdAndDelete(_id)
//     .then((response) => {
//       if (response) {
//         res.json({ status: "deleted" });
//       } else {
//         res.json({ status: "failed" });
//       }
//     })
//     .catch((error) => {
//       console.error("Error deleting job:", error);
//       res.json({ status: "error" });
//     });
// });


// // VOLUNTEER VIEW
// app.get('/vview', (req, res) => {
//   volunteermodel.find().then((response) => {
//     res.json(response);
//     console.log(response)
//   }).catch(() => {
//     res.json({ status: 'error' });
//   });
// });

// // UPDATED JOB VIEW pasted
// app.get('/updatejobview', (req, res) => {
//   updatejobmodel.find().then((response) => {
//     res.json(response);
//     console.log(response)
//   }).catch(() => {
//     res.json({ status: 'error' });
//   });
// });

// // JOB VIEW  pasted
// app.get('/jobview', (req, res) => {
//   jobmodel.find()
//     .populate('assignedVolunteer', 'name') // Populate assignedVolunteer field with only the name
//     .then((response) => {
//       if (response.length === 0) {
//         console.log('No jobs found in the database.');
//       } else {
//         console.log('Jobs from DB with populated volunteers:', response);
//       }
//       res.json(response); // Send response back to frontend
//     })
//     .catch((error) => {
//       console.error('Error fetching jobs from DB:', error);
//       res.json({ status: 'error' });
//     });
// });




// // REQUEST VIEW TO ADMIN pasted
// app.get('/rview', (req, res) => {
//   requestmodel.find().then((response) => {
//     res.json(response);
//     console.log(response)
//   }).catch(() => {
//     res.json({ status: 'error' });
//   });
// });

// // API to verify a volunteer (set `verified` to true)  pasted to routes
// app.post('/verify-volunteer/:id', async (req, res) => {
//   const { id } = req.params;  // Extract volunteer ID from URL params
//   try {
//     // Find the volunteer by ID and update its 'verified' field
//     const updatedVolunteer = await volunteermodel.findByIdAndUpdate(id, { verified: true }, { new: true });

//     if (updatedVolunteer) {
//       res.json({ status: 'success', message: 'Volunteer verified successfully', updatedVolunteer });
//     } else {
//       res.status(404).json({ status: 'error', message: 'Volunteer not found' });
//     }
//   } catch (error) {
//     console.error('Error verifying volunteer:', error);
//     res.status(500).json({ status: 'error', message: 'Error verifying volunteer' });
//   }
// });


// // ASSIGNED JOB VIEW pasted
// app.get('/jview/:_id', (req, res) => {
//   const { _id } = req.params;

//   console.log('Fetching jobs for volunteer ID:', _id); // Log the volunteer ID

//   jobmodel.find({ assignedVolunteer: _id })
//     .then((response) => {
//       if (response.length > 0) {
//         res.json(response); // Return the jobs assigned to the volunteer
//         console.log('Jobs found:', response); // Log the response to see the data
//       } else {
//         res.status(404).json({ status: 'error', message: 'No jobs found for this volunteer' });
//       }
//     })
//     .catch((err) => {
//       console.error('Error fetching jobs:', err); // Log the error
//       res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//     });
// });


// // ADMIN ASSIGN JOB TO VOLUNTEER pasted
// app.post('/assignjob', async (req, res) => {
//   const { title, description, assignedVolunteer, duration, location, date } = req.body;
//   try {
//     const job = new jobmodel({
//       title,
//       description,
//       assignedVolunteer,
//       duration,
//       location,
//       date,
//       status: "request"
//     });
//     await job.save();
//     res.json({ status: 'success', job, assignedVolunteer }); // Include assignedVolunteer in the response
//   } catch (error) {
//     res.json({ status: 'error', message: error.message });
//   }
// });



// // GET JOBS FOR VOLUNTEER pasted to routes
// app.get('/vview/:_id', async (req, res) => {
//   try {
//     const volunteer = await volunteermodel.findById(req.params._id);
//     if (!volunteer) {
//       return res.status(404).json({ status: 'error', message: 'Volunteer not found.' });
//     }
//     res.json(volunteer);
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// });



// // API for validating volunteer  pasted to routes
// app.post('/validate/:id', (req, res) => {
//   const volunteerId = req.params.id;

//   volunteermodel.findByIdAndUpdate(volunteerId, { isValidated: true }, { new: true })
//     .then((volunteer) => {
//       if (volunteer) {
//         res.json({ status: 'success', message: 'Volunteer validated successfully', volunteer });
//       } else {
//         res.status(404).json({ status: 'error', message: 'Volunteer not found' });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ status: 'error', message: 'Validation failed', error });
//     });
// });

// // Update volunteer availability status pasted to routes
// app.put('/update-availability/:id', async (req, res) => {
//   const { id } = req.params;
//   const { available } = req.body; // Expect the new availability status in the request body

//   try {
//     const updatedVolunteer = await volunteermodel.findByIdAndUpdate(
//       id,
//       { available: available }, // Update availability field
//       { new: true }
//     );

//     if (updatedVolunteer) {
//       res.json({ status: 'success', message: 'Availability updated successfully', available: updatedVolunteer.available });
//     } else {
//       res.status(404).json({ status: 'error', message: 'Volunteer not found' });
//     }
//   } catch (error) {
//     console.error('Error updating availability:', error);
//     res.status(500).json({ status: 'error', message: 'Error updating availability' });
//   }
// });



// // Get a specific volunteer's details (including availability status) pasted to routes
// app.get('/volunteer/:id', async (req, res) => {
//   const { id } = req.params; // Volunteer ID

//   try {
//     const volunteer = await volunteermodel.findById(id);
//     if (volunteer) {
//       res.json({ status: 'success', volunteer });
//     } else {
//       res.status(404).json({ status: 'error', message: 'Volunteer not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching volunteer:', error);
//     res.status(500).json({ status: 'error', message: 'Error fetching volunteer' });
//   }
// });

// // Accept a job pasted
// app.put('/accept-job/:id', async (req, res) => {
//   const { id } = req.params;
//   const { volunteerId } = req.body; // Get the volunteer ID from the request body

//   try {
//     const updatedJob = await jobmodel.findByIdAndUpdate(id, { accepted: true, rejected: false }, { new: true });

//     if (updatedJob) {
//       res.json({ status: 'success', message: 'Job accepted successfully' });
//     } else {
//       res.status(404).json({ status: 'error', message: 'Job not found' });
//     }
//   } catch (error) {
//     console.error('Error accepting job:', error);
//     res.status(500).json({ status: 'error', message: 'Error accepting job' });
//   }
// });

// // Reject a job pasted
// app.put('/reject-job/:id', async (req, res) => {
//   const { id } = req.params;
//   const { volunteerId } = req.body; // Get the volunteer ID from the request body

//   try {
//     const updatedJob = await jobmodel.findByIdAndUpdate(id, { accepted: false, rejected: true }, { new: true });

//     if (updatedJob) {
//       res.json({ status: 'success', message: 'Job rejected successfully' });
//     } else {
//       res.status(404).json({ status: 'error', message: 'Job not found' });
//     }
//   } catch (error) {
//     console.error('Error rejecting job:', error);
//     res.status(500).json({ status: 'error', message: 'Error rejecting job' });
//   }
// });


// // API to verify a request and notify the user dashboard pasted
// app.post('/verify/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find the request and update it as verified
//     const updatedRequest = await requestmodel.findByIdAndUpdate(
//       id,
//       {
//         verified: true,
//         verificationMessage: 'The request for that job is verified.' // Add a verification message
//       },
//       { new: true }
//     );

//     if (updatedRequest) {
//       // Notify the user if needed. 
//       // Assuming you have a way to send a notification to the user or update the user dashboard.

//       // Send a response to the frontend, which can trigger an update in the user dashboard
//       res.json({ status: 'success', message: 'Request verified successfully', updatedRequest });
//     } else {
//       res.status(404).json({ status: 'error', message: 'Request not found' });
//     }
//   } catch (error) {
//     console.error('Error verifying request:', error);
//     res.status(500).json({ status: 'error', message: 'Error verifying request' });
//   }
// });

// // API to create a new request pasted
// app.post('/requests', async (req, res) => {
//   try {
//     const { name, description, phone, duration, user_id } = req.body; // Assume user_id is sent from the client
//     const newRequest = new requestmodel({ name, description, phone, duration, user_id });
//     await newRequest.save();
//     res.status(201).json({ status: 'success', message: 'Request created successfully', request: newRequest });
//   } catch (error) {
//     console.error('Error creating request:', error);
//     res.status(500).json({ status: 'error', message: 'Error creating request' });
//   }
// });

// // API to get requests for a specific user PASTED
// // Route to fetch requests for a specific user based on their user_id
// app.get('/requests/user/:user_id', async (req, res) => {
//   const { user_id } = req.params; // Get the user_id from the request parameters

//   try {
//     // Fetch requests that belong to the user with the provided user_id
//     const userRequests = await requestmodel.find({ user_id });

//     if (userRequests.length > 0) {
//       res.json({ status: 'success', requests: userRequests });
//     } else {
//       res.status(404).json({ status: 'error', message: 'No requests found for this user' });
//     }
//   } catch (error) {
//     console.error('Error fetching user requests:', error);
//     res.status(500).json({ status: 'error', message: 'Error fetching user requests' });
//   }
// });

// // API route to submit feedback pasted
// app.post('/submit-feedback', async (req, res) => {
//   const { user_name, user_id, content } = req.body;

//   // Validate input
//   if (!user_name || !user_id || !content) {
//     return res.status(400).json({ status: 'error', message: 'All fields are required.' });
//   }

//   try {
//     // Create a new feedback entry
//     const newFeedback = new feedbackmodel({
//       user_name,
//       user_id,
//       content,
//     });

//     // Save feedback to the database
//     await newFeedback.save();
//     res.status(201).json({ status: 'success', message: 'Feedback submitted successfully', feedback: newFeedback });
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// });

// In your app.js or routes file pasted
// app.get('/feedbacks', async (req, res) => {
//   try {
//     const feedbacks = await feedbackmodel.find({});
//     res.json({ status: 'success', feedback: feedbacks });
//   } catch (error) {
//     console.error('Error fetching feedback:', error);
//     res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// });


// // CERTIFICATE REQUEST pasted
// app.post("/request-certificate", async (req, res) => {
//   try {
//     const { volunteerId, job } = req.body;
//     console.log("Received request:", req.body);

//     if (!volunteerId || !job || !job._id) {
//       return res.status(400).json({ status: "error", message: "Missing required fields" });
//     }

//     // Check if the request already exists
//     const existingRequest = await CertificateRequestModel.findOne({ volunteerId, jobId: job._id });
//     if (existingRequest) {
//       return res.status(400).json({ status: "error", message: "Certificate already requested", certificateStatus: existingRequest.status });
//     }

//     // Save certificate request with full job details
//     const certificateRequest = new CertificateRequestModel({
//       volunteerId,
//       jobId: job._id,
//       title: job.title,
//       description: job.description,
//       duration: job.duration,
//       location: job.location,
//       date: job.date,
//       status: job.status || "request"
//     });

//     await certificateRequest.save();

//     // Return response with correct status
//     res.json({
//       status: "success",
//       message: "Certificate request submitted successfully",
//       certificateStatus: certificateRequest.status // Include status in response
//     });
//   } catch (error) {
//     console.error("Error requesting certificate:", error);
//     res.status(500).json({ status: "error", message: "Failed to request certificate" });
//   }
// });



// // // VIEW CERTIFICATE
// app.get("/view-certificate", async (req, res) => {
//   try {
//     const certificateRequests = await CertificateRequestModel.find(); // Fetch all requests
//     console.log("certificateRequests", certificateRequests);


//     res.json({ status: "success", data: certificateRequests });
//   } catch (error) {
//     console.error("Error fetching certificate requests:", error);
//     res.status(500).json({ status: "error", message: "Failed to fetch certificate requests" });
//   }
// });

// // VERIFY CERTIFICATE REQUEST 
// app.post('/verify-certificate/:volunteerId', async (req, res) => {
//   try {
//     const { volunteerId } = req.params;

//     // Update the volunteer's certificate verification status
//     const updatedVolunteer = await volunteermodel.findByIdAndUpdate(
//       volunteerId,
//       { certificateVerified: true },
//       { new: true }
//     );

//     if (!updatedVolunteer) {
//       return res.status(404).json({ error: "Volunteer not found" });
//     }

//     // Update all certificate requests related to this volunteer to "verified"
//     await CertificateRequestModel.updateMany(
//       { volunteerId: volunteerId },
//       { status: "verified" }
//     );

//     res.json({ success: true, message: "Certificate verified successfully!" });
//   } catch (error) {
//     console.error("Error verifying certificate:", error);
//     res.status(500).json({ error: "Error verifying certificate" });
//   }
// });


// // STATUS CHANGING pasted
// app.patch('/status-change/:JobId', async (req, res) => {
//   try {
//     const { status } = req.body
//     const { JobId } = req.params

//     console.log("JobId", JobId);
//     console.log("status",status)
//     const updateStatus = await jobmodel.findByIdAndUpdate(JobId,
//       { status },
//       { new: true }
//     )

//     console.log("JobId",JobId);
//     console.log("updateStatus",updateStatus);
    

//     console.log("updateStatus", updateStatus)
//     if (!updateStatus) {
//       return res.status(404).json({ error: "Job Id not found" })
//     }
//     res.status(200).json({ "status": "success", message: "Updated Successfully" })
//   } catch (error) {
//     res.status(500).json({ error: "Status updation failed" });
//   }
// })



// // {JobId:eytrtrrf}


// // JOB VIEW FOR CERTIFICATE VERIFICATION FOR ADMIN pasted
// app.get("/view-jobs", async (req, res) => {
//   try {
//     const jobs = await jobmodel.find().populate("assignedVolunteer", "name email");
//     res.status(200).json({ success: true, data: jobs });
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     res.status(500).json({ error: "Failed to fetch jobs" });
//   }
// });


 
// // VIEW VOLUNTEER pasted to routes
// app.get('/volunteers', async (req, res) => {
//   try {
//       const volunteers = await volunteermodel.find();
//       res.json(volunteers);
//   } catch (error) {
//       console.error('Error fetching volunteers:', error);
//       res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//   }
// });


// // RATE VOLUNTEER pasted to routes
// app.post('/rateVolunteer', async (req, res) => {
//   try {
//       const { userId, volunteerId, score } = req.body;

//       if (!userId || !volunteerId || !score) {
//           return res.status(400).json({ status: 'error', message: 'User ID, Volunteer ID, and rating are required' });
//       }

//       const volunteer = await volunteermodel.findById(volunteerId);
//       if (!volunteer) {
//           return res.status(404).json({ status: 'error', message: 'Volunteer not found' });
//       }

//       // Check if user already rated the volunteer
//       const existingRating = volunteer.ratings.find(r => r.userId.toString() === userId);
//       if (existingRating) {
//           return res.status(400).json({ status: 'error', message: 'You have already rated this volunteer' });
//       }

//       // Add new rating
//       volunteer.ratings.push({ userId, rating: score });

//       // Calculate new average rating
//       const totalRatings = volunteer.ratings.length;
//       const sumRatings = volunteer.ratings.reduce((sum, r) => sum + r.rating, 0);
//       const newAverageRating = sumRatings / totalRatings;

//       await volunteer.save();

//       res.status(200).json({ 
//           status: 'success', 
//           message: 'Rating submitted successfully', 
//           newAverageRating 
//       });
//   } catch (error) {
//       console.error('Error rating volunteer:', error);
//       res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// });


// // VIEW VOLUNTEER pasted on routes

// app.get('/volunteer/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if the ID is a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ status: 'error', message: 'Invalid volunteer ID' });
//         }

//         const volunteer = await volunteermodel.findById(id);
//         if (!volunteer) {
//             return res.status(404).json({ status: 'error', message: 'Volunteer not found' });
//         }

//         // Calculate average rating
//         const totalRatings = volunteer.ratings?.length || 0;
//         const sumRatings = volunteer.ratings?.reduce((sum, r) => sum + r.rating, 0) || 0;
//         const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

//         res.status(200).json({ status: 'success', volunteer, averageRating });
//     } catch (error) {
//         console.error('Error fetching volunteer:', error);
//         res.status(500).json({ status: 'error', message: 'Internal server error' });
//     }
// });





// const port = process.env.PORT || 8080;
// app.listen(port,()=>{
//   console.log("server started")
// })

