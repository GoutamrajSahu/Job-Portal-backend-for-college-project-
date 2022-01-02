const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/TPOSystemDB",{useNewUrlParser: true, useUnifiedTopology: true});

//------------------------------------------(Mongoose schema for jobOpportunities )---------------------------------------//
const jobOpportunitiesSchema = mongoose.Schema({
    nameOfOrganization: String,
    jobTitle:String,
    selectionProcess: String,
    salary: Number,
    location:String,
    jobDescription: String,
    agreement: String,
    notes: String
 });
const jobOpportunities = mongoose.model("jobOpportunities", jobOpportunitiesSchema);
 
//------------------------------------------(Mongoose schema for Admin Information)---------------------------------------//
const adminInfoSchema = mongoose.Schema({
     name: String,
     email: String,
     password: String
 });
const adminInfo = mongoose.model("adminInfoSchema", adminInfoSchema);

adminInfo.find({},(err,foundRecord)=>{
    if(foundRecord.length > 0){
       console.log("Admin already exist.");
    }else{
       const newAdmin = new adminInfo({
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin"
       });
       newAdmin.save((err)=>{
           if(!err){
               console.log("New admin added successfully.");
           }else{
               console.log(err);
           }
       });
    }
});

//----------------------------------------("/admin")------------------------------------------//
router.get("/",(req,res)=>{
    res.send("It is admin info."); /*<--------------work pending*/
})

/*-----------------------------------("/admin/adminlogin")-------------------------------------*/
router.post("/adminlogin",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    adminInfo.find({"email":email,"password":password},(err, record)=>{
        if(!err){
          if(record.length > 0){
                res.send("Admin login success.");
          }else{
                res.send("Admin login failed.");
                //res.send(record);
          }
        }else{
            console.log(err);
        }
    })
    // console.log(req.body);
    //res.send("It is admin login");
})

//------------------------------------------("/admin/addJobOpportunities")---------------------------------------//
router.post("/addJobOpportunities", (req, res)=>{
    // res.send(req.body);
    const newJobOpportunity = new jobOpportunities({
        nameOfOrganization: req.body.nameOfOrganization,
        jobTitle: req.body.jobTitle,
        selectionProcess: req.body.selectionProcess,
        salary: req.body.salary,
        location:req.body.location,
        jobDescription: req.body.JobDescription,
        agreement: req.body.agreement,
        notes: req.body.notes
    });
    newJobOpportunity.save((err)=>{
        if(!err){
            res.send("Successfully added new job opportunity !");
        }else{
            res.send(err);
        }
    });
})

//------------------------------------------("/admin/updateJobOpportunities")---------------------------------------//
router.post("/updateJobOpportunities",(req, res)=>{
    // console.log(req.body);
    // console.log(req.body.JobDescription);                        /*<--------------work pending*/
    // res.send(req.body);
})




module.exports = router; /*<----Exporting*/