const { feedbackmodel } = require("../models/feedback")

const handleSubmitFeedback = async (req,res)=>{
      const { user_name, user_id, content } = req.body;
    
      // Validate input
      if (!user_name || !user_id || !content) {
        return res.status(400).json({ status: 'error', message: 'All fields are required.' });
      }
    
      try {
        // Create a new feedback entry
        const newFeedback = new feedbackmodel({
          user_name,
          user_id,
          content,
        });
    
        // Save feedback to the database
        await newFeedback.save();
        res.status(201).json({ status: 'success', message: 'Feedback submitted successfully', feedback: newFeedback });
      } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
}


const handleViewFeedback = async (req,res)=>{
    try {
        const feedbacks = await feedbackmodel.find({});
        res.json({ status: 'success', feedback: feedbacks });
      } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
}

module.exports = {handleSubmitFeedback,handleViewFeedback}

