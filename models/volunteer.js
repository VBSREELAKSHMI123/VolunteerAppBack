const mongoose=require("mongoose")
const schema = mongoose.Schema(
    {
            "name":String,
            "email":String,
            "address":String,
            "skill":String,
            "age":String,
            "gender":String,
            "phone":String,
            "password":String 
    }
)

let volunteermodel=mongoose.model("volunteers",schema);
module.exports={volunteermodel}