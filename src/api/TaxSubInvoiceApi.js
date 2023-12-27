import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getSubInvoice = async (searchQuery) => {
  console.log(searchQuery)
    try {
        let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${ 
        import.meta.env.VITE_APP_API
      }/inovicesh/invoices-c-search?search=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;

        
    } catch (error) {
        console.error(error)
        
    }
}

export const addSubInvioce = async (data , setOpenPrint) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/inovicesh/add-cinovices`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    toast.success("สร้าง ใบกำกับภาษี(รูปแบบสัพ) สำเร็จ")
    setOpenPrint(true)
    return response.data.data;
  } catch (error) {
    toast.error("ไม่สามารถสร้าง ใบกำกับภาษี(รูปแบบสัพ) กรุณาลองอีกครั้ง ")
  }
};
