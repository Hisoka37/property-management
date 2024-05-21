import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
<nav className="flex items-center gap-3 px-4 py-2 bg-gray-800 text-white">  
  <Link to="/" className="text-xl font-bold">HomePage</Link>
  <Link to="/add-property" className="btn btn-primary">Add New Property</Link>
</nav>

  )
}

export default Navbar