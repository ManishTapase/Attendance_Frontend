import React from 'react';
import { Routes,Route } from "react-router-dom";
import Attendance from './Components/Attendance';
import Login from './Components/login';
import Register from './Components/Register';
function App(){
  return (
    <>
    <Routes>
       <Route path="/" element={<Attendance />}/>
       <Route path="/login" element={<Login />}/>
       <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;