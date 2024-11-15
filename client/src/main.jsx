import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from './Pages/Register/Register'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import axios from 'axios'
import Create from './Pages/Create/Create'

const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path='/create' element={<Create/>}/>
              <Route path='/' element={<Home/>} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
