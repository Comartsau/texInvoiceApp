import axios from "axios";

export const getShop = async (searchQuery) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/salepoints/salepoints-search?search=${searchQuery}`,
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

export const addShop = async (data) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/salepoints/addsalepoint`,
      data,
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

export const editShop = async (data) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/salepoints/editsalepoint`,
      data,
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
export const deleteShop = async (id) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/product/delete/${id}`,
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
