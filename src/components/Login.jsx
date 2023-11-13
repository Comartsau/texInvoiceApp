import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Naii
  const [sendDataLogin, setSendDataLogin] = useState({});

  // สร้าง Token เป็นตัวเลขสุ่ม
  function generateRandomToken() {
    // สร้างตัวเลขสุ่ม (เช่น 6 หลัก)
    const randomToken = Math.floor(100000 + Math.random() * 900000); // 100000 - 999999
    return randomToken;
  }

  const handleChange = (e) => {
    setSendDataLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async (e) => {
    const data = {
      username: sendDataLogin.username,
      password: sendDataLogin.password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/login`,
        data
      );
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("Token", res.data.token);
        toast.success("เข้าสู่ระบบสำเร็จ ");
        const token = res.data.token;
        const decoded = jwtDecode(token);

        if (decoded.level === "1") {
          localStorage.setItem("Status", "admin");
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else if (decoded.level === "2") {
          localStorage.setItem("Status", "user");
          setTimeout(() => {
            navigate("/user");
          }, 2000);
        }
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSignIn = async () => {
  //   try {
  //     const data = {
  //       username: email,
  //       password: password,
  //     };

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_APP_API}/login`,
  //       data
  //     );

  //     console.log(response.data);
  //     if (response.data.check == 1) {
  //       localStorage.setItem("token", response.data.accessToken);
  //       localStorage.setItem("username", response.data.username);
  //       localStorage.setItem("check", response.data.check);
  //       localStorage.setItem("id", response.data.id);
  //       localStorage.setItem("btn_login", response.data.btn_login);
  //       localStorage.setItem("status", response.data.status);
  //       navigate("/mainAdmin");
  //       window.location.reload();
  //       Swal.fire({
  //         icon: "success",
  //         title: "เข้าสู่ระบบสำเร็จ",
  //         text: "คุณได้เข้าสู่ระบบเรียบร้อยแล้ว",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       // -----  Owner  ---- //
  //     } else if (data.username == "owner" && data.password == "owner") {
  //       const randomToken = generateRandomToken(); // สร้าง Token เป็นตัวเลขสุ่ม
  //       localStorage.setItem("token", randomToken); // เก็บ Token ใน localStorage
  //       navigate("/mainOwner");
  //       window.location.reload();
  //       Swal.fire({
  //         icon: "success",
  //         title: "เข้าสู่ระบบสำเร็จ ",
  //         text: "คุณได้เข้าสู่ระบบเรียบร้อยแล้ว Admin",
  //         showConfirmButton: false,
  //         timer: 1500,
  //         // confirmButtonText: 'ตกลง',
  //       });
  //       // ---------  User --------------- //
  //     }
  //   } catch (error) {
  //     console.error("Error checking URL:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "เข้าสู่ระบบไม่สำเร็จ ",
  //       text: "กรุณาเข้าระบบอีกครั้ง",
  //       confirmButtonText: "ตกลง",
  //     });
  //   }

  // };

  return (
    <div className="flex bg-gray-100 w-full h-[100vh] justify-center">
      <ToastContainer autoClose={2000} theme="colored" />

      <Card className="w-96 my-32 border-2 bg-gray-50 ">
        <div className="flex justify-center mt-10">
          <Typography variant="h4">เข้าสู่ระบบ</Typography>
        </div>
        <CardBody className="flex flex-col mt-5 gap-4">
          <Input
            color="blue"
            label="UserName"
            size="lg"
            name="username"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            color="blue"
            label="Password"
            size="lg"
            name="password"
            onChange={(e) => handleChange(e)}
            // onKeyPress={(e) => {
            //   if (e.key === "Enter") {
            //     handleSignIn();
            //   }
            // }}
          />
        </CardBody>
        <CardFooter className="pt-0 ">
          <Button
            color="blue"
            variant="gradient"
            fullWidth
            onClick={handleSignIn}
          >
            <Typography variant="h5" color="white">
              เข้าสู่ระบบ
            </Typography>
          </Button>

          <ul className="mx-auto mt-5">
            <li>ADMIN : admin / admin</li>
            <li>USER : user1 / 1234</li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
