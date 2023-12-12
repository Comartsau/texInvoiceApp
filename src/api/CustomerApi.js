import axios from "axios";

export const getCustomer = async (searchQuery) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/customer/customer-search?search=${searchQuery}`,
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

export const addCustomer = async (data) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/customer/addcustomer`,
      data,
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

export const editCustomer = async (data) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/customer/editcustomer`,
      data,
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
export const deleteCustomer = async (id) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/customer/delete/${id}`,
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
