import axios from "axios";

const tareas = axios.create({
  baseURL: "http://localhost:3000",
});

//GET
export const getTareas = async () => {
  try {
    const result = await tareas.get("/tareas");
    //console.log(result.data);
    return await result.data;
  } catch (error) {
    console.log(error);
  }
};

//POST
export const addTarea = async (tarea) => {
  try {
    const result = await tareas.post("/addTarea", tarea);
    console.log(result.data);
    console.log("tarea agregada");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

//DELTE
export const deleteTask = async (id) => {
  try {
    const result = await tareas.delete(`http://localhost:3000/delete/${id}`, {
      params: { id },
    });
    console.log("tarea borrada" + result.status);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTask = async (id) => {
  try {
    const result = await tareas.put(`http://localhost:3000/update/${id}`);
    console.log("tarea actualizada" + result.status);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
