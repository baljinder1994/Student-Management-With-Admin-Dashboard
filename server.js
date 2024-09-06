const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const adminRoutes=require('./routes/admin')
const studentRoutes=require('./routes/student')

const app=express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/management', {
useNewUrlParser:true,
useUnifiedTopology:true

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))


app.use('/api/admin',adminRoutes)
app.use('/api/student',studentRoutes)

const PORT=5000;
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`))