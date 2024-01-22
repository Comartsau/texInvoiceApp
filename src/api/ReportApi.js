import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getReportSale = async (DateStart, DateEnd) => {
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getReportShop = async (selectedShop, DateStart, DateEnd) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      // }/inovicesh/invoices-c-bill?salepoints=${selectedShop}&start_date=${DateStart}&end_date=${DateEnd}`,
      }/inovicesh/invoices-c-bill`,
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
    console.error(error);
  }
};

export const getReportSaleAdmin = async (userId, DateStart, DateEnd) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/inovicesh/invoices-bill-search-all?search=${userId}&start_date=${DateStart}&end_date=${DateEnd}`,
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
    console.error(error);
  }
};

export const getReportShopAdmin = async (
  userId,
  selectedShop,
  DateStart,
  DateEnd
) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/inovicesh/invoices-c-search-all?search_user=${userId}&salepoints=${selectedShop}&start_date=${DateStart}&end_date=${DateEnd}`,
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
    console.error(error);
  }
};

export const getShop = async (userId) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/salepoints-search-all?search_id=${userId}`,
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
