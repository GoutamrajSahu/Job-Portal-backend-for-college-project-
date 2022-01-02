//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const adminRouter = require("./routes/admin"); /*<---Importing admin routs.*/
const studentRouter = require("./routes/student"); /*<---Importing student routs.*/

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TPOSystemDB",{useNewUrlParser: true, useUnifiedTopology: true});


//------------------------------------------(Mongoose schema for New ContactUs )---------------------------------------// 
//code will be here.


//------------------------------------------("Admin")---------------------------------------//
app.use("/admin", adminRouter); /*<---Using routs of admin.js*/
//------------------------------------------("Student")---------------------------------------//
app.use("/student", studentRouter); /*<---Using routs of student.js*/


//------------------------------------------("/home" for Home page)---------------------------------------//
app.get("/home",(req, res)=>{
    jobOpportunities.find({},(err, foundRecord)=>{
        if(err){
             res.send(err);
        }else{
            res.send(foundRecord);
        }
    });
})

//------------------------------------------("/contactUs")---------------------------------------//
app.post("/contactus",(req,res)=>{
    /*
   -> Get data.
   -> Add all data to database.                            
   */
    console.log(req.body);               /*<--------------work pending*/
    res.send(req.body);
})
//------------------------------------------("/aboutUs")---------------------------------------//
app.post("/aboutus",(req,res)=>{
    /*
   -> Get data.
   -> Add all data to database.
   */
    console.log(req.body);                    /*<--------------work pending*/
    res.send(req.body);
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});