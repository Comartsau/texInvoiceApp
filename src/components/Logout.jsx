// import axios from "axios"
import Swal from "sweetalert2";

async function Logout(navigate) {
  try {
    const shouldLogout = await Swal.fire({
      title: "คุณต้องการออกจากระบบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    });

    if (shouldLogout.isConfirmed) {
      // const response = await axios.post(
      //   `${import.meta.env.VITE_APP_API}/logout`,
      //   {},
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Token ${Token}`,
      //     },
      //   }
      // );
      // console.log(response);
      // localStorage.clear();
      navigate("/");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการ logout" + error);
  }
}

export default Logout;
