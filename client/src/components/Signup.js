import React, {useState} from 'react'
import {TextField, Button, Box, Typography} from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import apiUrl from '../apiConfig';

const Signup = () => {
   const history = useNavigate();
   
   const [inputs, setInputs] = useState({
       name: "",
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
          const res = await axios.post(`${apiUrl}/signup`,{
              name: inputs.name,
              email: inputs.email,
              password: inputs.password
          }).catch(err => console.log(err))
          const data = await res.data;
          return data;
      }
 
    const handleSubmit= (e) =>{
        e.preventDefault();
        //console.log(inputs)
        //send the http request
         sendRequest().then(() => history('/login'))
    }

  return (
    <div className='signupPage'>
        <form onSubmit={handleSubmit}>
            <Box
            marginRight='auto'
            marginLeft='auto' 
            width={300} 
            display="flex" 
            flexDirection={"column"}
            justifyContent='center'
            alignItems='center'>
            <Typography variant='h3' padding={1} color="#062d5f">Signup</Typography>
                <TextField name='name' onChange={handleChange} value={inputs.name} variant='outlined' placeholder='Name' margin="normal" size="small" />
                <TextField name='email' onChange={handleChange} type={'email'} value={inputs.email} variant='outlined' placeholder='Email' margin="normal" size="small" />
                <TextField name='password' onChange={handleChange} type='password' value={inputs.password} variant='outlined' placeholder='Password' margin="normal" size="small" />
                <br /><Button variant='contained' type="submit">SignUp</Button>
            </Box>
         </form>
    </div>
  )
}

export default Signup
