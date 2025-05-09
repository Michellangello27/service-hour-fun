import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUser,
  getCountries,
  getRoles,
  getSchoolsList,
  getUserByRol,
} from "../axios/users/users";

export default function NewContactForm({ setCreateUserToggle, fetchData }) {
  const { register, handleSubmit, watch } = useForm();
  const [roles, setRoles] = useState([]);
  const [controllerList, setControllerList] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [recruiterList, setRecruiterList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const selectedRoleId = watch("role_id");

  async function handleUserCreate(requestData) {
    try {
      requestData.schools = [requestData.schools];

      const data = await createUser(requestData);
      if (data === 201) {
        setCreateUserToggle(false);
        fetchData();
        alert("Usuario registrado con éxito");
      }
    } catch (error) {
      console.error("Error al registrar usuario", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Set the error message from the server
      } else {
        setErrorMessage(
          "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
        );
      }
    }
  }

  useEffect(() => {
    getRoles()
      .then((rol) => setRoles(rol))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getCountries()
      .then((ct) => setCountriesList(ct))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getUserByRol(2) // obtener rol de controller
      .then((contro) => setControllerList(contro))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getSchoolsList() // obtener lista de escuelas
      .then((sch) => setSchoolsList(sch))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getUserByRol(3) // obtener rol de reclutador
      .then((rec) => setRecruiterList(rec))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="flex flex-col border justify-center items-center bg-white w-full h-full py-5 relative">
        <div className="absolute top-2 right-4">
          <figure
            className="size-6 cursor-pointer"
            onClick={() => setCreateUserToggle(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </figure>
        </div>

        <h2 className="font-semibold text-3xl">Nuevo Usuario</h2>

        {/* Display error message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-4 mb-2 w-[90%] max-w-[450px]">
            {errorMessage}
          </div>
        )}

        <form
          className="flex flex-wrap border gap-1 mt-4 w-[90%] max-w-[450px] justify-center bg-white shadow-lg p-6 rounded-md"
          onSubmit={handleSubmit(handleUserCreate)}
        >
          <label htmlFor="f_name">Primer Nombre</label>
          <input
            type="text"
            id="f_name"
            {...register("f_name")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="s_name">Segundo Nombre</label>
          <input
            type="text"
            id="s_name"
            {...register("s_name")}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="f_lastname">Primer Apellido</label>
          <input
            type="text"
            id="f_lastname"
            {...register("f_lastname")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="s_lastname">Segundo Apellido</label>
          <input
            type="text"
            id="s_lastname"
            {...register("s_lastname")}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="role_id">Rol</label>
          <select
            id="role_id"
            {...register("role_id")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          >
            <option value="">Selecciona un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>

          {/* Additional fields for non-admin roles */}
          {selectedRoleId !== "1" && (
            <>
              <label htmlFor="controller_id">Controller</label>
              <select
                id="controller_id"
                {...register("controller_id")}
                required
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
              >
                <option value="">Selecciona un Controller</option>
                {controllerList
                  .filter((controller) => controller.status === "activo")
                  .map((controller) => (
                    <option key={controller.id} value={controller.id}>
                      {controller.full_name}
                    </option>
                  ))}
              </select>

              <label htmlFor="recruiter_id">Reclutador</label>
              <select
                id="recruiter_id"
                {...register("recruiter_id")}
                required
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
              >
                <option value="">Selecciona un reclutador</option>
                {recruiterList
                  .filter((recruiter) => recruiter.status === "activo")
                  .map((recruiter) => (
                    <option key={recruiter.id} value={recruiter.id}>
                      {recruiter.full_name}
                    </option>
                  ))}
              </select>

              <label htmlFor="country_id">Pais</label>
              <select
                id="country_id"
                {...register("country_id")}
                required
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
              >
                <option value="">Selecciona un país</option>
                {countriesList.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              <label htmlFor="school_id">Escuela</label>
              <select
                id="school_id"
                {...register("schools")}
                required
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
              >
                <option value="">Selecciona una escuela</option>
                {schoolsList.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white mt-4 px-4 h-[40px] rounded-md hover:cursor-pointer"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
}
