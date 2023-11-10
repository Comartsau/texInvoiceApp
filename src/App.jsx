import { Routes, Route,useNavigate,Navigate } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import Login from "./components/Login";

import "./App.css";
import MainAdmin from "./components/admin/layout/MainAdmin";
import MainOwner from "./components/owner/layout/MainOwner";


function App() {
  
  const navigate = useNavigate()
  let Token = localStorage.getItem("token");
  const [Tokens,setTokens] = useState(localStorage.getItem("token"))

  const checkToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        });
        // console.log(response.data.message);
        if (response.data.message == "Yes") {
          return;
        }
      } catch (error) {
        // console.log(error.response.status);
        localStorage.clear();
        navigate("/")
      }
    };
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      checkToken();
    }, [Tokens]);



  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainAdmin/" element={<MainAdmin />} />
      <Route path="/mainOwner/" element={<MainOwner />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
