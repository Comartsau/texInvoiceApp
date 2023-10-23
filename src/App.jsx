
import { Routes, Route } from "react-router-dom";
import Login from './components/Login'

import './App.css'
import MainAdmin from "./components/admin/mainAdmin";
import MainOwner from "./components/owner/mainOwner";



function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainAdmin/" element={<MainAdmin />} />
      <Route path="/mainOwner/" element={<MainOwner />} />
    </Routes>
  )
}

export default App
