import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUser } from "../api/userPeticion";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const submit = handleSubmit(async (data) => {
    try {
      await loginUser(data);
      navigate("/tareas");
    } catch (error) {
      console.log(error);
    }
  });
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div className="bg-white w-80 h-120 rounded-xl shadow-md">
        <h2 className="text-2xl text-center mt-10">Login Tareas App</h2>
        <form action="" onSubmit={submit}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Usuario"
            {...register("usuario")}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Contraseña"
            {...register("contrasena")}
          />
          <div className="flex justify-center items-center">
            <button className="bg-blue-600 px-4 py-2 text-white rounded-xl">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
