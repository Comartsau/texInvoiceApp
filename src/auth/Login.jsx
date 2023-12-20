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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

import { useRecoilState } from "recoil";
import { userLoginStore } from "../store/Store";


function Login() {
  const navigate = useNavigate();

  // Naii
  const [sendDataLogin, setSendDataLogin] = useState({});

  const [userLogin ,setUserLogin] = useRecoilState(userLoginStore)


  const handleChange = (e) => {
    setSendDataLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async () => { 
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
            setUserLogin('admin')
            navigate("/admin");
            window.location.reload();
          }, 2000);
        } else if (decoded.level === "2") {
          localStorage.setItem("Status", "user");
          setTimeout(() => {
            setUserLogin('user')
            navigate("/user");
            window.location.reload();
          }, 2000);
        }
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };


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
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            color="blue"
            label="Password"
            size="lg"
            name="password"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSignIn();
              }
            }}
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
            <li>USER : user1 / user1</li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
