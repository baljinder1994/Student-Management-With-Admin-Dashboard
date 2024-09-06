import React from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import AdminRegister from './components/AdminRegister'
import AdminLogin from './components/AdminLogin'
import AddStudent from './components/AddStudent'
import AdminDashboard from './components/AdminDashboard'
import ViewStudent from './components/ViewStudent'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
const App = () => {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<><AdminRegister/></>
    },
    {
      path:'/login',
      element:<><AdminLogin/></>
    },
    {
      path:'/add',
      element:<><AddStudent/></>
    },
    {
      path:'/dashboard',
      element:<><AdminDashboard/></>
    },
    {
      path:'/view',
      element:<><ViewStudent/></>
    }
  ])
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  )
}

export default App
