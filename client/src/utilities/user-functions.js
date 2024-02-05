import axios from "axios";
const baseURL = "http://localhost:8000/api/users";

export const signUp = async (formData) => {
  let serverResponse = await axios({
    method: "POST",
    url: `${baseURL}/signup`,
    data: formData,
  });

  return serverResponse;
};

export const logIn = async (formData) => {
  let serverResponse = await axios({
    method: "POST",
    url: `${baseURL}/login`,
    data: formData,
  });

  return serverResponse;
};

export const logOut = async () => {
  try {
    let serverResponse = await axios({
      method: "POST",
      url: `${baseURL}/logout`,
      withCredentials: true,
    });
    return serverResponse;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (email) => {
  try {
    const response = await axios.get(`${baseURL}/api/users/get_user/u8@gmail.com`);
    return response.data;
  } catch (error) {
    console.error("Error while retrieving user:", error);
    throw error;
  }
};