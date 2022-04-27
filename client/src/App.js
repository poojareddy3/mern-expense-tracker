import React from 'react';
import { Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import WelcomePage from './components/WelcomePage'

function App() {
  return (
    <React.Fragment>
       <div className='home'>
      <Home />
      </div>
      <div className='homePage'>
         <h1>MERN Stack Expense Tracker</h1>
      </div>
   <main>
      <Routes>
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/user' element={<WelcomePage />} />
      </Routes>
   </main>
   </React.Fragment>
  );
}

export default App;
