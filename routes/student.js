const express=require('express')
const Student=require('../models/Student')
const router=express.Router()

router.get('/view',async (req,res) =>{
  try{
    const students=await Student.find();
    res.json(students)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
})

router.post('/add',async (req,res) =>{
    try{
      const {name,age,gender,class:studentClass,batchYear,rollNumber} =req.body;

      const existingStudent=await Student.findOne({rollNumber})
      if(existingStudent) return res.status(400).json({msg:"Student already exists"})
    
      const newStudent=new Student({name,age,gender,class:studentClass,batchYear,rollNumber})
      await newStudent.save()
      res.json(newStudent)
    
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})
//Stats
router.get('/stats',async (req,res) =>{
    try{
        const total=await Student.countDocuments();

        const male=await Student.countDocuments({gender:{$regex:/^male$/i}})
        const female=await Student.countDocuments({gender:{$regex:/^female$/i}})
    
      const batchData=await Student.aggregate([
        {$group:{_id:'$batchYear',count: {$sum:1}}},
        {$sort:{_id:1}}
      ]).exec();

      res.json({
        total,
        male,
        female,
        batchData:batchData.map(batch => ({year:batch._id, count:batch.count}) )
      })
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

router.put('/update/:id',async(req,res) =>{
  try{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body, {new:true})
    if(!student ) return res.status(404).json({msg:"Student not found"})
      res.json(student)
  }catch(err){
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id',async(req,res) =>{
  try{
    const result=await Student.findByIdAndDelete(req.params.id);
    if(!result) return res.status(404).json({msg:"Student not found"})
      res.json({msg:"Student deleted"})
  }catch(err){
    res.status(500).send('Server error')
  }
})


module.exports=router