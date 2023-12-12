import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./auth/Login";

import "./App.css";

// Naii
import { createContext } from "react";
export const AuthContent = createContext();
import RouteCheck from "./Routes/RouteCheck";


function App() {
  let Token = localStorage.getItem("Token");
  const statusCheck = localStorage.getItem("Status");


  // Naii
  const [loginData, setLoginData] = useState({
    status: 'เผื่อมีอะไรเก็บไปใช้ ทุกๆ Component'
  });


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // checkToken();
  }, []);

  return (
    <AuthContent.Provider value={{ loginData, setLoginData, statusCheck}}>
      <>
        {Token && statusCheck ? (
          <RouteCheck />

        ) : ( 
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </>
    </AuthContent.Provider>
  );
}

export default App;
