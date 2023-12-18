import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getFullInvoice = async (searchQuery) => {
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
    console.log(response.data)
    return response.data;

        
    } catch (error) {
        console.error(error)
        
    }

}

export const addFullInvioce = async (data) => {
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
    return response.data.data;
  } catch (error) {
    console.error(error);
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
