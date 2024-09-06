import React, { useState } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
const AddStudent = () => {

    const[studentData,setStudentData]=useState({
        name:'',
        age:'',
        class:'',
        gender:'',
        batchYear:'',
        rollNumber:''
    
    })

    const handleChange=(e) => setStudentData({...studentData,[e.target.name]: e.target.value})
         
    

    const handleSubmit= async (e) =>{
      e.preventDefault()

      try{
        await axios.post('http://localhost:5000/api/student/add',studentData)
        alert('Student Added Successfully')
       
      }catch(error){
        console.error(error.response.data)
      }
        
      }
    
    
  return (
    <div className='container-fluid'>
        <div className='row'>
            <Sidebar/>
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-4"  >
                <h2>Admin Dashboard</h2>
                <form onSubmit={handleSubmit} className='row g-3'>
                    <div className="col-md-6">
                        <input
                          type="text"
                          name="name"
                          className='form-control'
                          placeholder="Name"
                          value={studentData.name}
                          onChange={handleChange}
                          required
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                          type="number"
                          name="age"
                          className='form-control'
                           placeholder="Age"

                          value={studentData.age}
                          onChange={handleChange}
                          required
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                          type="text"
                          name="gender"
                          className='form-control'
                           placeholder="Gender"

                          value={studentData.gender}
                          onChange={handleChange}
                          required
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                          type="text"
                          name="class"
                          className='form-control'
                           placeholder="Class"

                          value={studentData.class}
                          onChange={handleChange}
                          required
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                          type="text"
                          name="batchYear"
                          className='form-control'
                           placeholder="Batch Year"

                          value={studentData.batchYear}
                          onChange={handleChange}
                          required
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                          type="number"
                          name="rollNumber"
                          className='form-control'
                           placeholder="Roll Number"

                          value={studentData.rollNumber}
                          onChange={handleChange}
                          required
                        ></input>
                    </div>
                    <div className="col-12">
                        <button type="submit" className='btn btn-primary'>Add Student</button>
                    </div>
                </form>
            </main>
        </div>
    </div>
  )
}

export default AddStudent
