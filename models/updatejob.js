const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":String
    }

)

let updatejobmodel=mongoose.model("updatejobs",schema);
module.exports={updatejobmodel}