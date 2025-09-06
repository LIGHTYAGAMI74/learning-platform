import React from 'react'
import  WelcomeBanner from './_components/welcomebanner'
import CourseList from './_components/CourseList'
const workspace = () => {
  return (
    <div className='p-4 space-y-4 '>
      <WelcomeBanner />
      <CourseList />
      {/* <h1 className='text-3xl font-bold'>This is the workspace page</h1> */}
    </div>
  )
}

export default workspace