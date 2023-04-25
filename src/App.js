// import logo from './logo.svg';
import './App.css';
import {ToastContainer} from "react-toastify"
import { BrowserRouter, Route, Routes, json, useNavigate } from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Booklist from './components/Booklist';
import AddBook from './components/AddBook';
import { useEffect } from 'react';

const Routing = ()=>{
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      return navigate("/")
    }
  },[])
  return <Routes>
  <Route path='/' element={<Register />} />
  <Route path='/login' element={<Login />} />
  <Route path='/booklist' element={<Booklist/>} />
  <Route path='/addbook' element={<AddBook/>} />
</Routes>
}

function App() {
  return (
    <BrowserRouter>
      <Routing/>
      <ToastContainer/>
    </BrowserRouter>

  );
}

export default App;
