import React from 'react'
import AddPropertyForm from '../components/AddPropertyForm.jsx'


const AddPropertyPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
      <AddPropertyForm />
    </div>
  )
}

export default AddPropertyPage