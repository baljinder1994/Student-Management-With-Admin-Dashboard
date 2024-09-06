const express=require('express')
const router=express.Router()
const Admin=require('../models/Admin')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

router.post('/register',async(req,res) =>{
    const {email,password}=req.body;

    try{
        const existingAdmin=await Admin.findOne({email})
        if(existingAdmin){
            return res.status(400).json({msg:'Admin already exists'})
        }
        //Hash Password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newAdmin=new Admin({email,password:hashedPassword})
        await newAdmin.save()

        res.status(201).json({msg:'Admin created successfully'})
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

//Login

router.post('/login',async(req,res) =>{
    const {email,password}=req.body;

    try{
        const admin=await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({msg:'Admin does not exist'})
        }

        const isMatch=await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'})
        }

        const token=jwt.sign({id:admin._id}, 'your_jwt_secret', {expiresIn:'1h'})
        res.json({token})
        
    }catch(error){
        res.status(500).json({msg:error.message})
    }
})

module.exports=router