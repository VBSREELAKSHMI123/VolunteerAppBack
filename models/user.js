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

let usermodel=mongoose.model("users",schema);
module.exports={usermodel}