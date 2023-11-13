import { Navigate, Route, Routes, } from "react-router-dom";
import HomeAdmin from "../components/admin/HomeAdmin";
import HomeUser from "../components/user/HomeUser";

import { AuthContent } from "../App";
import { useContext } from "react";

const RouteCheck = () => {
  const AuthData = useContext(AuthContent);

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
          <Route path="/user" element={<HomeUser />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        ""
      )}
    </>
  );
};

export default RouteCheck;
