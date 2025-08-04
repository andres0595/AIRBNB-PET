import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LogoInterRapidisimoImage from "../../img/logoInterrapidisimo.png";
import mascotas from "../../img/mascotas.jpg";
import { urlApi } from "../../server";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/slices/authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${urlApi}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) toast.error("Credenciales incorrectas");
      const result = await response.json();
      dispatch(
        setCredentials({
          token: result.token,
          nombre: result.nombre,
          role: result.rol,
          estudianteId: result.idEst,
        })
      );
      navigate("/dashboard");
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
  <div className="flex h-screen">
  {/* Imagen a la izquierda (puedes descomentar cuando lo necesites) */}
  <div
    className="hidden md:flex md:w-1/2 bg-cover bg-center"
    style={{ backgroundImage: `url(${mascotas})` }}
  ></div>

  {/* Formulario a la derecha */}
  <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="w-full md:w-1/2 bg-white flex justify-center items-center"
>
  <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl">
    <div className="flex justify-center mb-6">
      {/* Puedes poner un logo aquí si deseas */}
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Campo Email */}
      <div>
        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          {...register("Email", { required: "Email es requerido" })}
          type="text"
          id="email"
          placeholder="Email"
          className={`w-full p-3 text-black border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-shadow ${
            errors.Email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.Email && (
          <span className="text-red-500 text-sm">
            {errors.Email.message}
          </span>
        )}
      </div>

      {/* Campo Contraseña */}
      <div>
        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          {...register("Password", { required: "Password es requerido" })}
          type="password"
          id="password"
          placeholder="Contraseña"
          className={`w-full p-3 text-black border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-shadow ${
            errors.Password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.Password && (
          <span className="text-red-500 text-sm">
            {errors.Password.message}
          </span>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg transition-colors"
      >
        Entrar
      </button>
    </form>
  </div>
</motion.div>
</div>

  );
}

export default Login;
