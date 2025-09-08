import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LogoInterRapidisimoImage from "../../img/logoInterrapidisimo.png";
import mascotas from "../../img/mascotas.jpg";
import { urlApi } from "../../server";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

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
    <div className="flex h-screen mt-4">
      {/* Formulario a la izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 bg-white flex justify-center items-center"
      >
        <div className="w-full max-w-md px-8 py-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <label className="text-gray-800 text-lg">Iniciar sesión</label>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-gray-700 text-sm mb-1"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                {...register("Email", { required: "Email es requerido" })}
                type="text"
                id="email"
                placeholder="Usuario"
                className={`w-full px-4 py-2 rounded-full border text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                  errors.Email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.Email && (
                <span className="text-red-500 text-xs">
                  {errors.Email.message}
                </span>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label
                className="block text-gray-700 text-sm mb-1"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                {...register("Password", { required: "Password es requerido" })}
                type="password"
                id="password"
                placeholder="Contraseña"
                className={`w-full px-4 py-2 rounded-full border text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                  errors.Password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.Password && (
                <span className="text-red-500 text-xs">
                  {errors.Password.message}
                </span>
              )}
              <div className="text-right mt-1">
                <Link
                  to="/ChangePassword"
                  className="text-xs text-gray-500 hover:underline"
                >
                  ¿Has olvidado tu contraseña?
                </Link>
              </div>
            </div>

            {/* Botón principal */}
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Ingresar
            </button>
          </form>

          {/* Registro */}
          <div className="text-center mt-6 text-sm text-gray-600">
            ¿No tienes una cuenta de PuppyPo?{" "}
            <a href="#" className="text-gray-800 font-medium hover:underline">
              Regístrate ahora
            </a>
          </div>

          {/* Botones sociales */}
          <div className="mt-6 space-y-3">
            <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
              Continuar con Facebook
            </button>
            <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
              Continuar con Google
            </button>
            <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
              Continuar con Apple
            </button>
          </div>
        </div>
      </motion.div>

      {/* Imagen a la derecha */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${mascotas})` }}
      ></div>
    </div>
  );
}

export default Login;
