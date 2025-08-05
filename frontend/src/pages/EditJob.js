import React from 'react'
import NavBar from '../components/NavBar'
import JobForm from '../components/JobForm'

export default function EditJob() {
  return (
    <div>
      <NavBar />
      <JobForm type="Edit"/>
    </div>
  )
}
