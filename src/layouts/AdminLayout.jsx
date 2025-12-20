import React from 'react'
import AdminSidebarComponent from '../components/admin/AdminSidebarComponent'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='flex w-full'>
      <AdminSidebarComponent />
      <Outlet />
    </div>
  )
}

export default AdminLayout
