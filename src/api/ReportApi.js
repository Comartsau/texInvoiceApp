import axios from 'axios'
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getReportSale = async (DateStart , DateEnd) => {
    try {
        let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${ 
        import.meta.env.VITE_APP_API
      }/inovicesh/invoices-bill-search?start_date=${DateStart}&end_date=${DateEnd}`,
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

