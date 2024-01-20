import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const getFullInvoice = async (searchQuery , searchShop) => {
    try {
        let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/inovices/invoices-search?search=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    // console.log(response.data)
 
    return response.data;

        
    } catch (error) {
        console.error(error)
        
    }

}


export const addFullInvioce = async (data , setOpenPrint) => {
  try {
    
    let Token = localStorage.getItem("Token");
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/inovices/addinovices`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
      );
      toast.success("สร้าง ใบกำกับภาษี(รูปแบบเต็ม) สำเร็จ")
    setOpenPrint(true)
    return response.data.data;
  } catch (error) {
    toast.error("ไม่สามารถสร้าง ใบกำกับภาษี(รูปแบบเต็ม) กรุณาลองอีกครั้ง ")
  }
};

export const deleteFullInvoice = async (id , setToastOpen) => {
  // console.log(id)
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/inovices/delete/${String(id)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    // console.log(response.data)
    toast.success('ลบใบกำกับภาษี(รูปแบบเต็ม) สำเร็จ')
    setToastOpen(true)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
