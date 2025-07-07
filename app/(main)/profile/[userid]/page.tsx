"use client"
import UserProfile from '@/components/UserProfile'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { userid } = useParams();

  return (
    <div className='bg-black min-h-screen'>
      <UserProfile userid={Array.isArray(userid) ? userid[0] : userid ?? ''} />
    </div>
  )
}

export default Page