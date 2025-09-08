import { useForm } from "react-hook-form";
import mascotas from "../../img/mascotas.jpg";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex h-screen mt-4">
      <div className="w-full max-w-md px-4 py-20">
        <div className="flex justify-center mb-6">
          <h1>¿Has olvidado tu contraseña?</h1>
        </div>

        {/* Formulario */}
        <form /*onSubmit={handleSubmit(onSubmit)}*/ className="space-y-5">
          <div>
            <p className="block text-gray-700 text-sm mb-1">
              Para restablecer tu contraseña, escribe la dirección de correo
              electrónico completa que usaste para registrarte en PuppyPo.com y
              te enviaremos un correo que te ayudará a restablecer tu contraseña
              paso por paso
            </p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
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

          {/* Botón principal */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
      {/* Imagen a la derecha */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${mascotas})` }}
      ></div>
    </div>
  );
}
export default ChangePassword;
