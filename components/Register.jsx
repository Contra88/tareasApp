import { useForm } from "react-hook-form";
import { agregarUser } from "../api/userPeticion";
import { useNavigate } from "react-router";
import { userRegisterSchema } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });
  const navigate = useNavigate();

  const submit = handleSubmit(async (data) => {
    try {
      const res = await agregarUser(data);
      console.log(res);
      alert("Usuario Registrado");
      reset();
      navigate("/login");
    } catch (error) {
      console.log("Error al enviar datos " + error);
      alert(error.result.data.message);
      reset();
    }
  });
  //TODO BUSCAR BUENAS COMBINACIONES DE COLORES
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 ">
      <div className="bg-gray-100 rounded-2xl w-80 h-120 shadow-md space-y-4 ">
        <h3 className="text-3xl text-gray-800 text-center font-bold mt-5">
          Registrarse
        </h3>
        <form action="" onSubmit={submit}>
          <input
            type="text"
            className="h-8 w-70 m-4 rounded-xl bg-gray-400 mt-10"
            {...register("user")}
          />
          <p className="text-red-700">{errors.user?.message}</p>
          <input
            type="text"
            id=""
            className="h-8 w-70 m-4 rounded-xl bg-gray-400  border-none mt-10"
            {...register("password")}
          />
          <p className="text-red-700">{errors.password?.message}</p>
          <div className="flex justify-center items-center">
            <button className="bg-blue-400 hover:bg-blue-500 rounded-xl text-white px-4 py-2 mt-30">
              Registrarse
            </button>
          </div>
          <p className="mt-5 text-2xl text-indigo-400 hover:text-indigo-600 fixed ">
            <a href="" onClick={() => navigate("/login")}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
