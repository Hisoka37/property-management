import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar.jsx'
import AddPropertyPage from './pages/AddPropertyPage.jsx'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <div>
      <Navbar />
      <div className='max-w-3xl my-3 text-black mx-auto transition-all duration-300 flex-1 '>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/add-property" element={<AddPropertyPage />} /> 
      </Routes>
      <Toaster />
      </div>
    </div>
  )
}

export default App
