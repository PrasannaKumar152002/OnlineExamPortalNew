import logo from '../logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Welcome from '../components/Wecome';
import Login2 from '../components/Login2';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
// import Admin from './components/admin';

function SignIn({rolestate}) {
  const [state, setState]  = useState(false);
  const change=()=>{
    setState(!state);
    console.log("called...");
  }
  const back=()=>{
    setState(!state);
    console.log("called...");
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login2 title="Home" rolestate={rolestate}/>}/>
          <Route path='/' element={<Welcome/>}/>
          {/* <Route path='/admin' element={<Admin/>}/> */}
          <Route path='/user' element={<Welcome/>}/>
        </Routes>
      </Router>
    {/* {state?<Login2 onclk={back} title="Home" />:<Sin onclk={change} title="Login"/>}  */}
    </div>
  );
}

export default SignIn;
