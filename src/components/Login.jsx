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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // สร้าง Token เป็นตัวเลขสุ่ม
  function generateRandomToken() {
    // สร้างตัวเลขสุ่ม (เช่น 6 หลัก)
    const randomToken = Math.floor(100000 + Math.random() * 900000); // 100000 - 999999
    return randomToken;
  }

  const handleSignIn = async () => {
    try {
      const data = {
        username: email,
        password: password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/login`,
        data
      );

      console.log(response.data);
      if (response.data.check == 1) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("check", response.data.check);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("btn_login", response.data.btn_login);
        localStorage.setItem("status", response.data.status);
        navigate("/mainAdmin");
        window.location.reload();
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: "คุณได้เข้าสู่ระบบเรียบร้อยแล้ว",
          showConfirmButton: false,
          timer: 1500,
        });
        // -----  Owner  ---- //
      } else if (data.username == "owner" && data.password == "owner") {
        const randomToken = generateRandomToken(); // สร้าง Token เป็นตัวเลขสุ่ม
        localStorage.setItem("token", randomToken); // เก็บ Token ใน localStorage
        navigate("/mainOwner");
        window.location.reload();
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ ",
          text: "คุณได้เข้าสู่ระบบเรียบร้อยแล้ว Admin",
          showConfirmButton: false,
          timer: 1500,
          // confirmButtonText: 'ตกลง',
        });
        // ---------  User --------------- //
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ ",
        text: "กรุณาเข้าระบบอีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }

    // ------------ for API --------------------------- //
    // try {
    //   const data = {
    //     username:email,
    //     password:password
    //   }
    //   // const response = await axios.post("http://26.125.18.207:8000/login",data);
    //   const response = await axios.post(`${import.meta.env.VITE_APP_API}/login`,data);

    //   // console.log(response)
    //   //------ Display -----//
    //   if (response.data.check == 0) {
    //     localStorage.setItem("token", response.data.accessToken)
    //     // localStorage.setItem("username", response.data.username)
    //     // localStorage.setItem("check", response.data.check)
    //     // localStorage.setItem("id", response.data.id)
    //     // localStorage.setItem("btn_login", response.data.btn_login)
    //     // localStorage.setItem("status", response.data.status)
    //     navigate("/display");
    //     window.location.reload();
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'เข้าสู่ระบบสำเร็จ',
    //       text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว',
    //       showConfirmButton: false,
    //       timer: 1500
    //       // confirmButtonText: 'ตกลง',
    //     });
    //     // -----  Admin  ---- //
    //   } else if(response.data.check == 1)  {
    //     localStorage.setItem("token", response.data.accessToken)
    //     localStorage.setItem("username", response.data.username)
    //     localStorage.setItem("check", response.data.check)
    //     localStorage.setItem("id", response.data.id)
    //     localStorage.setItem("btn_login", response.data.btn_login)
    //     localStorage.setItem("status", response.data.status)
    //     navigate("/dashboard/home");
    //     window.location.reload();
    //     // console.log("22222222222222")
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'เข้าสู่ระบบสำเร็จ ',
    //       text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว Admin',
    //       showConfirmButton: false,
    //       timer: 1500
    //       // confirmButtonText: 'ตกลง',
    //     });
    //     // ---------  User --------------- //
    //   }else if(response.data.check == 2)  {
    //     localStorage.setItem("token", response.data.accessToken)
    //     localStorage.setItem("username", response.data.username)
    //     localStorage.setItem("check", response.data.check)
    //     localStorage.setItem("id", response.data.id)
    //     localStorage.setItem("btn_login", response.data.btn_login)
    //     localStorage.setItem("status", response.data.status)
    //     navigate("/dashboard/home");
    //     window.location.reload();
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'เข้าสู่ระบบสำเร็จ ',
    //       text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว User',
    //       showConfirmButton: false,
    //       timer: 1500
    //       // confirmButtonText: 'ตกลง',
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error checking URL:", error);
    //   // console.log("33333333333333333333333")
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'เข้าสู่ระบบไม่สำเร็จ ',
    //     text: 'กรุณาเข้าระบบอีกครั้ง',
    //     confirmButtonText: 'ตกลง',
    //   });
    //   // Handle error case here, if needed
    // }
  };

  return (
    <div className="flex bg-gray-100 w-full h-[100vh] justify-center">
      <Card className="w-96 my-32 border-2 bg-gray-50 ">
        <div className="flex justify-center mt-10">
          <Typography variant="h4">เข้าสู่ระบบ</Typography>
        </div>
        <CardBody className="flex flex-col mt-5 gap-4">
          <Input
            color="blue"
            label="UserName"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            color="blue"
            label="Password"
            size="lg"
            // onChange={(e)=> setPassword(e.target.value)} />
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
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
          {/* <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
