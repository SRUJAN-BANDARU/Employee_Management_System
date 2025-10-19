import React from 'react'
import { useAuth } from '../context/authContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'
const AdminDashboard = () => {
  const {user, loading} = useAuth()
  const navigate = useNavigate()
  if(loading){
    return <div> Loading...</div>
  }
  if(!user){
    navigate('/login')
  }
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-200 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
