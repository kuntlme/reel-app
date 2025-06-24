"use client"
import React, { useState } from 'react'
import NavigationBar from './Navbar'

const Main = () => {
  const [activeTab, setActiveTab] = useState('home');

  

  return (
    <div className='min-h-screen bg-black'>
        <NavigationBar activeTab={activeTab} onTabChange={setActiveTab}/>
    </div>
  )
}

export default Main