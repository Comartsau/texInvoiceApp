import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getShortInvoice = async (searchQuery) => {
    try {
        let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${ 
        import.meta.env.VITE_APP_API
      }/inovices/invoices-sh-search?search=${searchQuery}`,
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

export const addShortInvioce = async (data , setOpenPrint) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/inovices/add-sh-inovices`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    toast.success("สร้าง ใบกำกับภาษี(รูปแบบย่อย) สำเร็จ")
    setOpenPrint(true)
    return response.data.data;
  } catch (error) {
    toast.error("ไม่สามารถสร้าง ใบกำกับภาษี(รูปแบบย่อย) กรุณาลองอีกครั้ง ")
    console.log('bbbb')
    // console.error(error);
  }
};

export const deleteFullInvoice = async (id) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/inovices/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
