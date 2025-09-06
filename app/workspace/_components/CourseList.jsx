"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog'
const CourseList = () => {
    const [courses, setCourses] = useState([])

  return (
    <div>
        <h2 className='text-2xl font-bold'>CourseList</h2>

        {courses?.length == 0 ? 
        <div className='flex p-7 items-center justify-center flex-col gap-5 border-2  border-gray-300 rounded-lg mt-10 h-[400px] bg-black'> 
            <img src="/globe.svg" alt="No courses" className='w-60 h-60 ' />
            <h2 className='text-lg font-bold text-amber-50'> look like you haven't created any courses yet</h2>

    <AddNewCourseDialog>

            <Button className=' bg-gradient-to-r from-gray-500 to-gray-300 text-black font-semibold shadow-md hover:from-gray-400 hover:to-gray-200 transition'> create a course</Button>
    </AddNewCourseDialog>


        </div> : (
          <ul>
            {courses.map(course => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default CourseList