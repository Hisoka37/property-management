import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='flex '>
        <Link to='/'> HomePage </Link>
        <Link to='add-property'>Add New Prop</Link>
    </nav>
  )
}

export default Navbar