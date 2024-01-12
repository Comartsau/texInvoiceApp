import axios from "axios";

export const getCompany = async (searchQuery) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/company-search?search=${searchQuery}`,
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

export const addCompany = async (data) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editCompany = async (data) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/company/edit`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCompany = async (id) => {
  try {
    let Token = localStorage.getItem("Token");
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/company/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
