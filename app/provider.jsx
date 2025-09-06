"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect } from 'react'
import { UserDetailContext } from '../context/UserDetailContext'
import { useState } from 'react'

const Provider = ({children}) => {
  const { isLoaded, isSignedIn, user } = useUser()

  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      CreateNewUser();
    }
  }, [isLoaded, isSignedIn, user]);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        name : user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
      })
      console.log(result.data.message); // "User created" or "User already exists"
      console.log(result.data.user);    // user data
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  }

  return (

    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        {children}
      </div>
    </UserDetailContext.Provider>
  )
}

export default Provider
