import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const Sidebar = () => {
    const[isSidebarOpen, setSidebarOpen] =useState(false)

    const toggleSidebar=() =>{
        setSidebarOpen(!isSidebarOpen)
    }
  return (
    <nav id="sidebar" className={`col-md-3 col-lg-2 d-md-block bg-dark sidebar ${isSidebarOpen ? 'show' : ''}`}>
        <div className="position-sticky">
            <button className="btn btn-primary d-md-none mb-2" type="button" data-toggle="collapse"
             onClick={toggleSidebar}
            >Toggle Sidebar</button>
         <div className={`collapse d-md-block ${isSidebarOpen ? 'show' : ''}`} id="sidebarCollapse" >
            <h4 className="sidebat-heading">Admin Dashboard</h4>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link to="/dashboard" className='nav-link'>Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/add" className='nav-link'>Add Student</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>View Student</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>Update Student</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>Add Teachers</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>View Teachers</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>Update Teachers</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>Add Courses</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>View Courses</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/view" className='nav-link'>Update Courses</Link>
                </li>

            </ul>
         </div>
        </div>
    </nav>
  )
}

export default Sidebar
