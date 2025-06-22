import axios from "axios";

const users = axios.create({
  baseURL: "http://localhost:3000",
});

//GET ALL
export const getUsers = async () => {
  try {
    const response = await users.get("/users");
    //console.log(response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

//REGISTER USER
export const agregarUser = async (newUser) => {
  try {
    const response = await users.post("/addUser", {
      user: newUser.user,
      password: newUser.password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//LOGIN USER
export const loginUser = async (data) => {
  try {
    const result = await users.post("/user", data);
    return result.data;
  } catch (error) {
    return error;
  }
};

//export default getUsers;
