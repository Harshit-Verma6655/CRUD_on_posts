import React from 'react'
import Register from './pages/Register'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import TextareaVariants from './pages/CreateBlog'
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/createPost/' element={<TextareaVariants />} />
        <Route path='/createPost/:id' element={<TextareaVariants />} />
      </Routes>

    </>
  )
}

export default App