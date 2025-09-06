import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'


const AddNewCourseDialog = ({ children }) => {
  

  const [loading, setLoading] = useState(false);

 const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    noOfChapters: 1,
    includePrerequisites: false,
    difficultyLevel: '',
    courseCategory: '',
 })

 const onHandleInputChange =(field,value) => {
   setFormData(prev => ({
     ...prev,
     [field]: value
   }))
   console.log(formData)
 }
const onGenerate = async () => {
 
 try {
  setLoading(true);
  console.log("Generating course with data:", formData)
  const result = await axios.post('/api/generate-course-layout', {
    ...formData,
  });
  console.log("Course generated:", result.data);
  setLoading(false);
} catch (error) {
  console.error("Error generating course:", error);
  setLoading(false);
}
}

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        className="bg-black text-white rounded-2xl border border-gray-700 shadow-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
            Add New Course
          </DialogTitle>
          <DialogDescription asChild>
            <div className='flex flex-col gap-4 mt-4 text-white'>
              <div className='flex flex-col gap-2 mb-4'>
                <label className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">Course Name</label>
                <Input placeholder="Enter course name" className="bg-gray-900 border-gray-700 text-white"  onChange={(event)=>onHandleInputChange('courseName',event.target.value)}/>
              </div>
              <div>
                <label className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">Course Description</label>
                <Input placeholder="Enter course description" className="bg-gray-900 border-gray-700 text-white"  onChange={(event)=>onHandleInputChange('courseDescription',event.target.value)}/>
              </div>
              <div>
                <label className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">No. of Chapters</label>
                <Input placeholder="Enter number of chapters" type="number" className="bg-gray-900 border-gray-700 text-white"  onChange={(event)=>onHandleInputChange('noOfChapters',event.target.value)}/>
              </div>
              <div className='flex items-center gap-2 mt-4'>
                <label className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">Include Prerequisites</label>
                <Switch
                
                      onCheckedChange={()=>onHandleInputChange('includePrerequisites',!formData?.includePrerequisites)}
                />
              </div>
              <div>
                <label className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">Difficulty Level</label>
                <Select onValueChange={(value)=>onHandleInputChange('difficultyLevel',value)}>
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">Course Category</label>
                <Input placeholder="Enter course category" className="bg-gray-900 border-gray-700 text-white"  onChange={(event)=>onHandleInputChange('courseCategory',event.target.value)}/>
              </div>
              <div>
                <Button disabled={loading} className="w-full mt-4 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 text-black font-semibold shadow-md hover:from-gray-600 hover:via-gray-400 hover:to-gray-200 transition" onClick={onGenerate}>
                  {loading? <Loader2Icon className="mr-2 animate-spin" /> : <Sparkle className="mr-2" />}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewCourseDialog
