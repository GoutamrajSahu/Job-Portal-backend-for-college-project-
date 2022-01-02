const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/TPOSystemDB",{useNewUrlParser: true, useUnifiedTopology: true});

//------------------------------------------(Mongoose schema for New User/Student)---------------------------------------// 
const studentSchema = mongoose.Schema({
    name: String,
    email:String,
    phoneNo: Number,
    rollNo: String,
    gender:String,
    semester: String,
    password: String,
 });
 
 const student = mongoose.model("student", studentSchema);

router.get("/",(req,res)=>{
    res.send("It is student info.");
})

//------------------------------------------("/student/login")---------------------------------------//
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    student.find({"email":email,"password":password},(err, foundStudent)=>{
        if(foundStudent.length>0){
            // res.send(foundStudent);
            res.send("Login Success !!!");
        }else{
            res.send("Wrong email or password !!!");
        }
    });
    // res.send(req.body);
})

//------------------------------------------("/student/studentregistration")---------------------------------------//
router.post("/studentregistration",(req,res)=>{
    const newStudent = new student({
        name: req.body.name,
        email:req.body.email,
        phoneNo: req.body.phoneNo,
        rollNo: req.body.rollNo,
        gender: req.body.gender,
        semester: req.body.semester,
        password: req.body.password,
    });

    student.find({email:req.body.email},(err,foundStudent)=>{
        if(foundStudent.length > 0){
            res.send("Student already exist, please login else change the email id.");
        }else{
            newStudent.save((err)=>{
                if(!err){
                    res.send("Successfully added new student !");
                }else{
                    res.send(err);
                }
            });
        }
    });
    // res.send(req.body);
})


module.exports = router; /*<----Exporting*/