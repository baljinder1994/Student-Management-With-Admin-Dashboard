const mongoose=require('mongoose')

const StudentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    age:{type:String,required:true},
    gender:{type:String,required:true},
    class:{type:String,required:true},
    batchYear:{type:Number,required:true},
    rollNumber:{type:String,required:true,unique:true},
})

module.exports=mongoose.model('Student',StudentSchema )