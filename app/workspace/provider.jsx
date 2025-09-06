import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/sidebar'
import Appheader from './_components/Appheader'


const WorkspaceProvider = ({children}) => {
  return (
    
    <SidebarProvider>
      <AppSidebar />
     {/* <SidebarTrigger /> */}


      <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-100 animate-gradient">
        <Appheader />
        <div className="p-10">{children}</div>
      </div>

    </SidebarProvider>
  )
}

export default WorkspaceProvider