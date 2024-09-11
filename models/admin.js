const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":String,
        "email":String,
        "phone":String,
        "address":String,
        "password":String
    }
)

let adminmodel=mongoose.model("admins",schema);
module.exports={adminmodel}