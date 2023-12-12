import axios from "axios";
import Swal from "sweetalert2";

async function Logout(navigate) {
  let Token = localStorage.getItem("token");
  try {
    const shouldLogout = await Swal.fire({
      title: "คุณต้องการออกจากระบบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    });

    if (shouldLogout.isConfirmed) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_APP_API}/logout`,
        headers: {
          Authorization: `Token ${Token}`,
        },
      };
      axios.request(config).then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.clear();
        navigate("/");
      });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการ logout" + error);
  }
}

export default Logout;
