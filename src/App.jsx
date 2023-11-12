import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";

import "./App.css";
import MainAdmin from "./components/admin/layout/MainAdmin";
import MainOwner from "./components/owner/layout/MainOwner";

// Naii
import { createContext } from "react";
export const AuthContent = createContext();
import RouteCheck from "./Routes/RouteCheck";

function App() {
  const navigate = useNavigate();
  let Token = localStorage.getItem("Token");
  const [Tokens, setTokens] = useState(localStorage.getItem("token"));

  // Naii
  const [loginData, setLoginData] = useState({
    status: 'เผื่อมีอะไรเก็บไปใช้ ทุกๆ Component'
  });

  // const checkToken = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_APP_API}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${Token}`,
  //         },
  //       });
  //       // console.log(response.data.message);
  //       if (response.data.message == "Yes") {
  //         return;
  //       }
  //     } catch (error) {
  //       // console.log(error.response.status);
  //       localStorage.clear();
  //       navigate("/")
  //     }
  //   };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // checkToken();
  }, []);

  return (
    <AuthContent.Provider value={{ loginData, setLoginData }}>
      <>
        {Token ? (
          <RouteCheck />

        ) : ( 
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </>
    </AuthContent.Provider>
  );
}

export default App;
