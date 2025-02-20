import { authUser } from '@/utils/auth'
import { redirect } from 'next/navigation'
import React from 'react'

function UserDashboard() {
  redirect('/p-user/orders')
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard