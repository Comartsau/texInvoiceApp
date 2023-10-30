import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import "./App.css";
import MainAdmin from "./components/admin/layout/MainAdmin";
import MainOwner from "./components/owner/layout/MainOwner";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainAdmin/" element={<MainAdmin />} />
      <Route path="/mainOwner/" element={<MainOwner />} />
    </Routes>
  );
}

export default App;
