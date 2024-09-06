import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const AdminRegister = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleSubmit=async(e) =>{
      e.preventDefault()

      try{
        const response= await axios.post('http://localhost:5000/api/admin/login',{
            email,
            password,
        })
       const {token}= response.data

       localStorage.setItem('authToken',token)
       navigate('/dashboard')
      }catch(error){
        console.error(error)
      }
    }
  return (
    <div className='conatiner mt-5'>
       <div className='row justify-content-center'>
        <div className='col-md-6'>
            <div className="card">
                <div className='card-body'>
                    
                        <h2 className="card-title text-center">Login</h2>
                        <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input 
                            type="email" class="form-control"
                             id="email" aria-describedby="emailHelp"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password"
                             class="form-control"
                              id="password"
                              value={password}
                             onChange={(e) => setPassword(e.target.value)}
                              />
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                </div>
            </div>
        </div>
       </div>
    </div>
  )
}

export default AdminRegister
