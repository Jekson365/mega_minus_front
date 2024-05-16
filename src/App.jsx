import { createContext, useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Users from './users/Users'
import Login from './authenticatio/Login'
import '../src/styles/users.scss'
import Navbar from './components/Navbar'
import instance from './api'
import Userpage from './users/Userpage'
import Signup from './authenticatio/SIgnup'
import Edituser from './users/Edituser'
import Products from './products/Products'
import Createproduct from './products/Createproduct'

export const UserContext = createContext()
export const defaultImage = "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?fit=620%2C389&ssl=1"

function App() {

  return (
    <>
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/users' element={<Users/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/user' element={<Userpage/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/edit' element={<Edituser/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/new_product' element={<Createproduct/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
