import React, {useState} from 'react'
import {TextField, Button, Box, Typography} from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import apiUrl from '../apiConfig';

const Login = () => {
  const history = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
}) 

const handleChange = (e) => {
   setInputs(prev => ({
       ...prev,
       [e.target.name]: e.target.value
   }))
}

   const sendRequest = async () => {
       const res = await axios.post(`${apiUrl}/login`,{
           email: inputs.email,
           password: inputs.password
       }).catch(err => console.log(err))
       //console.log(res)
       const data = await res.data;
       return data;
   }

 const handleSubmit= (e) =>{
     e.preventDefault();
     //console.log(inputs)
     //send the http request
      sendRequest().then(() => history('/user'))
 }

return (
 <div className='loginPage'>
     <form onSubmit={handleSubmit}>
         <Box
         marginRight='auto'
         marginLeft='auto' 
         width={300} 
         display="flex" 
         flexDirection={"column"}
         justifyContent='center'
         alignItems='center'>
         <Typography variant='h3' color={'#062d5f'}>Login </Typography><br />
             <TextField  name='email' onChange={handleChange} type={'email'} value={inputs.email} variant='outlined' placeholder='Email' margin="normal" size="small" />
             <TextField  name='password' onChange={handleChange} type='password' value={inputs.password} variant='outlined' placeholder='Password' margin="normal" size="small" />
             <br /><Button variant='contained' type="submit">Login</Button>
         </Box>
      </form>
 </div>
)
}

export default Login
