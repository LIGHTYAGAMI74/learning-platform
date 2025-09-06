import React from 'react'
import WorkspaceProvider from './provider'

const workspaceLayout = ({children}) => {
  return (
    <WorkspaceProvider>
        {children}
    </WorkspaceProvider>
  )
}

export default workspaceLayout