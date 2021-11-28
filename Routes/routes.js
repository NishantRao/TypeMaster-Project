const express = require("express");

const router = express.Router();

const Register = require("../src/Model/registerSchema");
const jwt = require("jsonwebtoken")

// ************** bcrypt 
const bcrypt = require("bcryptjs");

// ************** authentiaction 
const auth = require("../src/Middleware/auth")




// **************************** Login Area 

router.get("/",(req,res) =>{
    res.render("Login_Page");
});

router.post("/login",async(req,res) =>{
    try{
        const entry = await Register.findOne({Username:req.body.Username});
        if (entry==null){
            res.send("Please Enter Correct Details")

        }else{
            const matchpass = await bcrypt.compare(req.body.Password,entry.Password);
            // **************jwt token 
            const token = await entry.generatetoken();

            res.cookie("jwt",token)
            if (matchpass){
                res.redirect("../SpeedTest")
            }else{
                res.send("Please enter Correct Details")
            }
        }
    }catch(err){
        console.log(err);
    }
})

// *************************************** Register Area 

router.get("/register",(req,res) =>{
    res.render("Register_page");
})
router.post("/register",async(req,res) =>{
    console.log(req.body);
    try{
        if (req.body.Confirm == req.body.Password){
            const User = new Register({
                Username: req.body.Username,
                Email : req.body.Email,
                Phoneno : req.body.Phoneno,
                Password : req.body.Password,
                Confirm : req.body.Confirm
            })
            const token = await User.generatetoken();

            res.cookie("jwt",token)
            const re = await User.save();
            res.redirect("../")

        }else{
            console.log("Please enter correct details");
        }

    }catch(err){
        res.status(400).send(err)
    }
})



// ************************************ Speed TEst

router.get("/SpeedTest",auth,(req,res) =>{
    res.render("SpeedTest")
});

router.get("/Aboutus",(req,res) =>{
    res.render("AboutUs")
})

router.get("/profile",auth ,(req,res) =>{
    res.render("Profile");
})

module.exports= router;