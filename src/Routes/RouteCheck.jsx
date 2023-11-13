import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomeAdmin from "../components/admin/HomeAdmin";
import HomeOwner from "../components/owner/HomeOwner";

import { AuthContent } from "../App";
import { useContext } from "react";
import { useEffect } from "react";
import { Login } from "@mui/icons-material";

const RouteCheck = () => {
  const AuthData = useContext(AuthContent);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(AuthData.statusCheck);
  }, []);

  return (
    <>
      {AuthData.statusCheck === "admin" ? (
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        ""
      )}
      {AuthData.statusCheck === "user" ? (
        <Routes>
          <Route path="/" element={<Navigate to="/user" />} />
          <Route path="/user" element={<HomeOwner />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        ""
      )}
    </>
  );
};

export default RouteCheck;
