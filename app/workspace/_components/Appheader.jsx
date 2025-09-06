import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'


const Appheader = () => {
  return (
    <div className="p-4 flex  justify-between items-center shadow-sm bg-black ">
      <SidebarTrigger />
      <UserButton />
    </div>
  )
}

export default Appheader;