import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import {Pie,Line} from 'react-chartjs-2'
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)

const AdminDashboard = () => {
   const[studentStats,setStudentStats]=useState({
    total:0,
    male:0,
    female:0,
    batchData:[],
   })

   const[rollNumber,setRollNumber]=useState('')

   useEffect(() =>{
    const fetchStudentStats=async() =>{
        try{
            const res=await axios.get('http://localhost:5000/api/student/stats');
            setStudentStats(res.data)
        }catch(err){
            console.error('Error fetching student stats',err)
        }
    }
    fetchStudentStats()
   },[])

   const genderData={
    labels:['Male','Female'],
    datasets:[
        {
            label:'Gender Distribution',
            data:[studentStats.male,studentStats.female],
            backgroundColor:['#36A2EB','#FF6384']
        }
    ]
   }
   const batchData={
    labels:studentStats.batchData.map(batch => batch.year),
    datasets:[
        {
            label:'Students By Batch ',
            data:studentStats.batchData.map(batch => batch.count),
            backgroundColor:['#FFCE56']
        }
    ]
   }

   const pieOptions={
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
        legend:{
            position:'top'

        },
    },
    layout:{
        padding:20,
    }
   }

   const lineOptions={
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
        legend:{
            position:'top'

        },
    },
    layout:{
        padding:20,
    }
   }



  return (
    <div className='container-fluid'>
        <div className="row">
        <Sidebar/>
        <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-4"  >
                <h2>Admin Dashboard</h2>
                <div className="d-flex flex-wrap">
                    <div className="card text-white bg-primary mb-3 ms-3" style={{width:'18rem'}}>
                        <div className='card-body'>
                            <h5 className='card-title'>Total Students</h5>
                            <p className="card-text">{studentStats.total}</p>
                        </div>
                    </div>
                    <div className="card text-white bg-success mb-3 ms-3" style={{width:'18rem'}}>
                        <div className='card-body'>
                            <h5 className='card-title'>Female </h5>
                            <p className="card-text">{studentStats.female}</p>
                        </div>
                    </div>
                    <div className="card text-white bg-danger mb-3 ms-3" style={{width:'18rem'}}>
                        <div className='card-body'>
                            <h5 className='card-title'>Male</h5>
                            <p className="card-text">{studentStats.male}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Gender Distribution</h3>
                        <div style={{position:'relative',height:'100%',height:'300px'}}>
                            <Pie
                              id="pie-chart"
                              data={genderData}
                              options={pieOptions}
                            ></Pie>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>Gender Distribution</h3>
                        <div style={{position:'relative',height:'100%',height:'300px'}}>
                            <Line
                              id="pie-chart"
                              data={batchData}
                              options={lineOptions}
                            ></Line>
                        </div>
                    </div>
                </div>
       </main>
        </div>
      
    </div>
  )
}

export default AdminDashboard
