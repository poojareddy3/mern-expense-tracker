import React,{ useState } from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, Box, Tabs, Tab, Typography} from '@mui/material'

const Home = () => {
    const [values, setValues] = useState();

  return (
    <div className='navDiv'>
        <AppBar sx={{ bgcolor: '#06254b'}}>
            <Toolbar>
                <Typography variant='h4'>Home</Typography>
                <Box sx={{ marginLeft: 'auto'}}>
                <Tabs 
                    indicatorColor='secondary'
                    onChange={(e, val) => setValues(val)} 
                    value={values} 
                    textColor='#fff'>
                        <Tab to='/login' LinkComponent={Link} label='Login' />
                        <Tab to='/signup' LinkComponent={Link} label='Signup' />
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Home
