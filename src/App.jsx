import { createContext, useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Users from './users/Users'
import '../src/styles/users.scss'
import Navbar from './components/Navbar'
import Login from './authentication/Login'
import instance from './api'
import Userpage from './users/Userpage'
import Signup from './authentication/Signup'
import Edituser from './users/Edituser'
import Products from './products/Products'
import Calculation from './callucation/Calculation'
import Createproduct from './products/Createproduct'
import Mycalculations from './callucation/Mycalculations'
import NewOverhead from './overheads/NewOverhead'
import Overheads from './overheads/Overheads'

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
            <Route path='/calculation' element={<Calculation/>}/>
            <Route path='/mycalcs' element={<Mycalculations/>}/>
            <Route path='/new_overheads' element={<NewOverhead/>}/>
            <Route path='/overheads' element={<Overheads/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
