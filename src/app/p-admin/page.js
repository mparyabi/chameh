import { authUser } from '@/utils/auth'
import { redirect } from 'next/navigation'
import React from 'react'

function AdminDashboard() {
  redirect('/p-admin/orders');
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard