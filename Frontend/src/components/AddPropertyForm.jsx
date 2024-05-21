import { useState } from "react";
import toast from "react-hot-toast";



const AddPropertyForm = () => {
    const [formData, setFormData] = useState({
    _id: '',
    address: '',
    rentalCost: '',
    propertyName: '',
    tag: '',
    contractStartDate: '',
    contractEndDate: '',
    directCost: '',
    group: 'Full Property List',
    city: '',
    fixedCost: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProperty = {
          ...formData,
          rentalCost: { "April:2024": formData.rentalCost },
          directCost: { "April:2024": formData.directCost },
          fixedCost: Number(formData.fixedCost),
          __v: 0,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProperty),
            });
            if (response.ok) {
                toast.success('Property added successfully');
            } else {
                toast.error('Error adding property');
            }
            
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Error adding property');
        }
        
    }

    
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
    <div className="mb-4">
    <label className="block text-sm font-medium mb-2">ID</label>
    <input
      type="text"
      name="_id"
      value={formData._id}
      onChange={handleChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Address</label>
    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Rental Cost</label>
    <input
      type="text"
      name="rentalCost"
      value={formData.rentalCost}
      onChange={handleChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
      required
    />
  </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Property Name</label>
      <input
        type="text"
        name="propertyName"
        value={formData.propertyName}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Tag</label>
      <input
        type="text"
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Contract Start Date</label>
      <input
        type="date"
        name="contractStartDate"
        value={formData.contractStartDate}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Contract End Date</label>
      <input
        type="date"
        name="contractEndDate"
        value={formData.contractEndDate}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Direct Cost</label>
      <input
        type="text"
        name="directCost"
        value={formData.directCost}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Fixed Cost</label>
      <input
        type="number"
        name="fixedCost"
        value={formData.fixedCost}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        required
      />
    </div>
    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600">
      Add Property
    </button>
  </form>
  
  )
}

export default AddPropertyForm