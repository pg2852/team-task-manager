const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()

const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware")


// SIGNUP
router.post("/signup", async(req,res)=>{

  try {

    const {name,email,password,role} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.status(400).json({
        message:"User already exists"
      })
    }

    const newUser = new User({
      name,
      email,
      password:hashedPassword,
      role
    })

    await newUser.save()

    res.status(201).json({
      message:"User Registered Successfully"
    })

  } catch (error) {

    res.status(500).json(error)

  }

})



// LOGIN
router.post("/login", async(req,res)=>{

  try {

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
      return res.status(404).json({
        message:"User not found"
      })
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({
        message:"Invalid credentials"
      })
    }

    const token = jwt.sign(
      {
        id:user._id,
        role:user.role
      },
      "secretkey",
      {
        expiresIn:"7d"
      }
    )

    res.json({
      token,
      user
    })

  } catch (error) {

    res.status(500).json(error)

  }

})

console.log("PROFILE ROUTE LOADED")

router.get("/test",(req,res)=>{
    res.send("TEST ROUTE WORKING")
})

router.get("/profile", authMiddleware, async(req,res)=>{

    res.json({
        message:"Protected Profile Route",
        user:req.user
    })

})

module.exports = router