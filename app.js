const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const {volunteermodel}=require("./models/volunteer")
const {usermodel}=require("./models/user")
const {adminmodel}=require("./models/admin")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://sree:sree2002@cluster0.n63e6.mongodb.net/volunteerdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword=async(password)=>{
  const salt=await bcrypt.genSalt(10)
  return bcrypt.hash(password,salt)
}


// ADD VOLUNTEER 

app.post("/addvol", async(req,res)=>{
    let input=req.body
    let hashpassword=await generateHashedPassword(input.password)
    input.password=hashpassword
    let volunteer = new volunteermodel(input)
    console.log(volunteer)
    volunteer.save()
    res.json({"status":"success"})
})

// ADD USER

app.post("/adduser",async(req,res)=>{
    let input=req.body
    let hashpassword=await generateHashedPassword(input.password)
    input.password=hashpassword
    let user=new usermodel(input)
    console.log(user)
    user.save()
    res.json({"status":"success"})
})

// ADD ADMIN

app.post("/addadmin",async(req,res)=>{
    let input=req.body
    let hashpassword=await generateHashedPassword(input.password)
    input.password=hashpassword
    let admin=new adminmodel(input)
    console.log(admin)
    admin.save()
    res.json({"status":"success"})
})

// VOLUNTEER LOGIN

app.post("/vlogin",(req,res)=>{
    let input=req.body
    volunteermodel.find({"email":req.body.email}).then(
        (response)=>{
            if (response.length>0) {
                let dbpsw=response[0].password
                console.log(dbpsw)
                bcrypt.compare(input.password,dbpsw,(error,isMatch)=>{
                    if (isMatch) {
                        jwt.sign({email: input.email},"volunteer-app",{expiresIn: "1d"},
                           (error,token)=>{
                            if (error) {
                               res.json({"status":"unable to create token"}) 
                            } else {
                              res.json({"status":"success","volunteer_id":response[0].volunteer_id,"token":token})  
                            }
                           } 
                        )
                    } else {
                       res.json({"status":"incorrect password"}) 
                    }
                })
            } else {
                
                res.json({"status":"incorrect email"})
        }
        }
    ).catch(
        (error)=>{
            res.json({"status":"error"})
        }
    )
})

// USER LOGIN

app.post("/ulogin",(req,res)=>{
    let input=req.body
    usermodel.find({"email":req.body.email}).then(
        (response)=>{
            if (response.length>0) {
                let dbpsw=response[0].password
                console.log(dbpsw)
                bcrypt.compare(input.password,dbpsw,(error,isMatch)=>{
                    if (isMatch) {
                        jwt.sign({email: input.email},"volunteer-app",{expiresIn: "1d"},
                           (error,token)=>{
                            if (error) {
                               res.json({"status":"unable to create token"}) 
                            } else {
                              res.json({"status":"success","user_id":response[0].user_id,"token":token})  
                            }
                           } 
                        )
                    } else {
                       res.json({"status":"incorrect password"}) 
                    }
                })
            } else {
                
                res.json({"status":"incorrect email"})
        }
        }
    ).catch(
        (error)=>{
            res.json({"status":"error"})
        }
    )
})

// ADMIN LOGIN

app.post("/alogin",(req,res)=>{
    let input=req.body
    adminmodel.find({"email":req.body.email}).then(
        (response)=>{
            if (response.length>0) {
                let dbpsw=response[0].password
                console.log(dbpsw)
                bcrypt.compare(input.password,dbpsw,(error,isMatch)=>{
                    if (isMatch) {
                        jwt.sign({email: input.email},"volunteer-app",{expiresIn: "1d"},
                           (error,token)=>{
                            if (error) {
                               res.json({"status":"unable to create token"}) 
                            } else {
                              res.json({"status":"success","admin_id":response[0].admin_id,"token":token})  
                            }
                           } 
                        )
                    } else {
                       res.json({"status":"incorrect password"}) 
                    }
                })
            } else {
                
                res.json({"status":"incorrect email"})
        }
        }
    ).catch(
        (error)=>{
            res.json({"status":"error"})
        }
    )
})

// SEARCH VOLUNTEER

app.post("/vsearch",(req,res)=>{
    let input=req.body
    volunteermodel.find(input).then(
        (response)=>{
            res.json(response)
        }
    ).catch(
        (error)=>{
            res.send("error")
        }
    )
})

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`server started successfully ${PORT}`)
})