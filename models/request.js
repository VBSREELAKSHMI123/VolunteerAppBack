const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":String,
        "description":String,
        "phone":String,
        "duration":String,
        verified: { type: Boolean, default: false } ,// Add the verified field, default is false
        verificationMessage: String, // Add a field for storing the message
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usermodel' },
        assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'volunteermodel' }// Associate request with a user
    }

)

let requestmodel=mongoose.model("requests",schema);
module.exports={requestmodel}