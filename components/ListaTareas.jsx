import { useState, useEffect } from "react";
import {
  getTareas,
  addTarea,
  deleteTask,
  updateTask,
} from "../api/tareasPeticion.js";

function ListaTareas() {
  //VARIABLES DE ESTADO
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");
  const [theme, setTheme] = useState("ligth");
  // const [user, setUser] = useState({});

  //GET TASK DB
  useEffect(() => {
    async function cargarTareas() {
      try {
        const data = await getTareas(); // ✅ Esperar la promesa
        console.log("Datos obtenidos:", data);
        setLista(data); // ✅ data debe ser un array
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    }
    cargarTareas();
  }, []);

  //add tarea al estado
  const addTaskToState = (e) => {
    //e.preventDefault();
    setTarea(e.target.value);
  };

  //ADD TASK TO DB
  const addNuevaTarea = async (e) => {
    e.preventDefault();
    //console.log(tarea);

    if (!tarea.trim()) return;
    try {
      const nuevaTarea = { nombre: tarea };
      const res = await addTarea(nuevaTarea);
      console.log(res);
    } catch (error) {
      console.log("Error al guaradra tarea " + error);
    }
  };

  //DELETE TASK
  const borrarTarea = async (id) => {
    // console.log(e);
    try {
      const res = await deleteTask(id);
      console.log(res);
      // Actualiza la lista eliminando la tarea
      setLista(lista.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  //UPDATE TASK
  const updateTarea = async (id) => {
    try {
      const res = await updateTask(id);
      setTarea(res[0].nombre);
      //console.log(res[0].nombre);
      console.log(tarea);
    } catch (error) {
      console.log(error.message);
    }
  };

  //CHANGE THEME
  const handleChangeTheme = () => {
    setTheme((theme) => (theme === "ligth" ? "dark" : "ligth"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);
  //TODO 3* FECHA DE TAREAS CREADAS Y COMPLETAS Y CONTADOR TAREAS TERMINADAS

  return (
    <div className="bg-gray-200 min-h-screen dark:bg-gray-700">
      <button
        className="absolute top-4 right-4  text-white px-4 py-2 rounded"
        onClick={handleChangeTheme}
      >
        <img
          src="src/assets/night-mode.png"
          id="night-btn"
          className="h-8 w-8 "
          alt=""
        />
      </button>
      <div className="flex justify-center items-center text-center h-80  w-auto mb-10">
        <form
          className="flex flex-col items-center gap-4 w-100 h-50 bg-white rounded-xl shadow-md mt-10 dark:bg-gray-500"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-2xl font-bold dark:text-white ">Lista Tareas</h3>

          <input
            className="w-60 h-8 rounded-2xl px-2"
            type="text"
            placeholder="Nueva tarea"
            onChange={addTaskToState}
            value={tarea}
          />

          <button
            id="agregar"
            onClick={addNuevaTarea}
            className="bg-blue-500 px-4 py-2 text-white rounded-2xl mt-5"
          >
            Agregar
          </button>
        </form>
      </div>

      {lista.map((e) => {
        return (
          <div
            key={e.id}
            className="bg-white w-[400px] mx-auto my-4 p-4 rounded-xl shadow-lg flex flex-col items-center gap-4 mb-5 dark:bg-gray-500"
          >
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {e.nombre}
            </p>

            <div className="flex gap-3">
              <button className="bg-green-400 px-4 py-2 rounded-2xl text-white hover:bg-green-500 transition">
                Listo
              </button>
              <button
                onClick={() => updateTarea(e.id)}
                className="bg-blue-400 px-4 py-2 rounded-2xl text-white hover:bg-blue-500 transition"
              >
                Editar
              </button>
              <button
                onClick={() => borrarTarea(e.id)}
                className="bg-red-500 px-4 py-2 rounded-2xl text-white hover:bg-red-600 transition"
              >
                Borrar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ListaTareas;
