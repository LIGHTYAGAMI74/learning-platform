// Update the import path below to the correct relative path for your project structure
import { Button } from '../components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>page
      <br />

<Button>Click me</Button>

<UserButton />

    </div>
  )
}

export default page