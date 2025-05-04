const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const mongoose = require("mongoose");

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

const app = require("./app");

const port = process.env.PORT || 8080;
app.listen(port,()=>{
  console.log("server started")
})