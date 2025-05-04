const { requestmodel } = require("../models/request")

const handleAddRequest = async (req,res)=>{
    const { user_id, name, description, phone, duration } = req.body; // Destructure the necessary fields

  try {
    // Create a new request using the input data, including user_id
    const request = new requestmodel({
      user_id, // Include the user ID from the request data
      name,
      description,
      phone,
      duration,
    });

    // Save the request to the database
    await request.save();

    // Send a success response
    res.json({ "status": "success" });
  } catch (error) {
    console.error('Error adding request:', error);
    res.status(500).json({ "status": "error", "message": "Failed to add request" });
  }
}

const handleRequestView = (req,res)=>{
      requestmodel.find().then((response) => {
        res.json(response);
        console.log(response)
      }).catch(() => {
        res.json({ status: 'error' });
      });
}

const handleVerifyRequest = async (req,res)=>{
    const { id } = req.params;
    
      try {
        // Find the request and update it as verified
        const updatedRequest = await requestmodel.findByIdAndUpdate(
          id,
          {
            verified: true,
            verificationMessage: 'The request for that job is verified.' // Add a verification message
          },
          { new: true }
        );
    
        if (updatedRequest) {
          // Notify the user if needed. 
          // Assuming you have a way to send a notification to the user or update the user dashboard.
    
          // Send a response to the frontend, which can trigger an update in the user dashboard
          res.json({ status: 'success', message: 'Request verified successfully', updatedRequest });
        } else {
          res.status(404).json({ status: 'error', message: 'Request not found' });
        }
      } catch (error) {
        console.error('Error verifying request:', error);
        res.status(500).json({ status: 'error', message: 'Error verifying request' });
      }
}

const handleCreateRequest = async(req,res)=>{
    try {
        const { name, description, phone, duration, user_id } = req.body; // Assume user_id is sent from the client
        const newRequest = new requestmodel({ name, description, phone, duration, user_id });
        await newRequest.save();
        res.status(201).json({ status: 'success', message: 'Request created successfully', request: newRequest });
      } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ status: 'error', message: 'Error creating request' });
      }
}

const handleFetchRequest = async (req,res)=>{
    const { user_id } = req.params; // Get the user_id from the request parameters
    
      try {
        // Fetch requests that belong to the user with the provided user_id
        const userRequests = await requestmodel.find({ user_id });
    
        if (userRequests.length > 0) {
          res.json({ status: 'success', requests: userRequests });
        } else {
          res.status(404).json({ status: 'error', message: 'No requests found for this user' });
        }
      } catch (error) {
        console.error('Error fetching user requests:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching user requests' });
      }
}

module.exports={handleAddRequest,handleRequestView,handleVerifyRequest,handleCreateRequest,handleFetchRequest}