import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import AddPropertyForm from './components/AddPropertyForm'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar.jsx'


function App() {
  return (
    <div>
      <Navbar />
      <div className='max-w-3xl my-3 text-black mx-auto transition-all duration-300 flex-1 '>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/add-property" element={<AddPropertyForm />} /> 
      </Routes>
      </div>
    </div>
  )
}

export default App
