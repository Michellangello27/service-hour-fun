import { login } from "../axios/auth/login";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const requestData = Object.fromEntries(formdata.entries());

    try {
      const data = await login(requestData);
      console.log(data.status);
      if (data.status === "success") {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      } else {
        setErrorMessage("Ocurrió un error inesperado. Por favor, inténtalo más tarde.");
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Imagen */}
      <div className="flex-1 md:flex-1 flex items-center justify-center bg-gray-100 h-1/3 md:h-auto">
        <img
          src="/images/login-photo.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Formulario Login */}
      <div className="flex-2 md:flex-1 flex flex-col justify-center items-center bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm font-medium">
            {errorMessage}
          </div>
        )}
        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
