const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":String,
        "email":String,
        "phone":String,
        "address":String,
        "password":String,
        assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'volunteers' }
    }
)

let usermodel=mongoose.model("users",schema);
module.exports={usermodel}