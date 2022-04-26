import '../App.css'
import React,{useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Header from './Header'
axios.defaults.withCredentials = true;

const WelcomePage = () => {
 
  const [user, setUser] = useState()

 const sendRequest = async() => {
   const res = await axios.get('http://localhost:3000/api/user',{
      withCredentials: true
   }).catch(err => console.log(err))
   const data = await res.data;
   return data;
 }

  useEffect(() => {
     sendRequest().then((data) => setUser(data.user))
  },[])

  return (
    <div className='welcomeDiv'>
       <div className='user'>
       {user && <h1>Welcome {user.name}</h1>}
       </div>
       <style type="text/css">
      {`.navDiv {display: none}`}
      </style>
      
       <div>
       <Header />
       </div>
       <div className='logout'>
       <NavLink to='/'>Logout</NavLink>
       </div>
    </div>
  )
}

export default WelcomePage
