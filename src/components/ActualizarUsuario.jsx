import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRoles, getSchoolsList, getUserByRol, updateUsers } from "../axios/users/users";
import { profile } from "../axios/auth/login";


export default function ActualizarUsuario() {

  const { register, handleSubmit, reset, setValue } = useForm();
  const [roles, setRoles] = useState([]);
  const [controllerList, setControllerList] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [recruiterList, setRecruiterList] = useState([]);
  const [perfil, setPerfil] = useState({});
  const userId = perfil?.id
  console.log(perfil)

  // Función para manejar la actualización del usuario
  async function handleUserUpdate(requestData) {
    try {
      requestData.schools = [requestData.schools]; // Asegurarse de que `schools` sea un array
      console.log("Datos enviados para actualizar:", requestData);

      const status = await updateUsers(userId, requestData); // Llamar a la función `updateUsers`
      if (status === 200 || status === 201) {
        // setUpdateUserToggle(false);
        alert("Usuario actualizado con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar usuario");
    }
  }

  // Cargar roles, controladores, reclutadores y escuelas
  useEffect(() => {
    profile()
      .then((perfil) => setPerfil(perfil))
      .catch((error) => console.error(error));

    getRoles()
      .then((rol) => setRoles(rol))
      .catch((error) => console.error(error));

    getUserByRol(2) // Obtener lista de controladores
      .then((contro) => setControllerList(contro))
      .catch((error) => console.error(error));

    getSchoolsList() // Obtener lista de escuelas
      .then((sch) => setSchoolsList(sch))
      .catch((error) => console.error(error));

    getUserByRol(3) // Obtener lista de reclutadores
      .then((rec) => setRecruiterList(rec))
      .catch((error) => console.error(error));
  }, []);

  // Cargar datos del usuario para prellenar el formulario
//   useEffect(() => {
//     async function fetchUserData() {
//       try {
//         const userData = await getUserByRol(userId); // Cambia esto si tienes una función específica para obtener un usuario
//         console.log("Datos del usuario:", userData);

//         // Prellenar los valores del formulario
//         Object.keys(userData).forEach((key) => {
//           if (key === "schools") {
//             setValue("schools", userData.schools[0]?.id || ""); // Prellenar la primera escuela
//           } else {
//             setValue(key, userData[key]);
//           }
//         });
//       } catch (error) {
//         console.error("Error al cargar datos del usuario:", error);
//       }
//     }

//     fetchUserData();
//   }, [userId, setValue]);

  return (
    <div>
      <div className="flex flex-col border justify-center items-center bg-white w-full h-full py-5 relative">
        <div className="absolute top-2 right-4">
          <figure
            className="size-6 cursor-pointer"
            // onClick={() => setUpdateUserToggle(false)}
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

        <h2 className="font-semibold text-3xl">Actualizar Usuario</h2>
        <form
          className="flex flex-wrap border gap-1 mt-4 w-[90%] max-w-[450px] justify-center bg-white shadow-lg p-6 rounded-md"
          onSubmit={handleSubmit(handleUserUpdate)}
        >
          <label htmlFor="f_name">Primer Nombre</label>
          <input
            type="text"
            id="f_name"
            defaultValue={perfil?.f_name}
            {...register("f_name")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="m_name">Segundo Nombre</label>
          <input
            type="text"
            id="m_name"
            defaultValue={perfil?.m_name }
            {...register("m_name")}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="f_lastname">Primer Apellido</label>
          <input
            type="text"
            id="f_lastname"
            defaultValue={perfil?.f_lastname}
            {...register("f_lastname")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="s_lastname">Segundo Apellido</label>
          <input
            type="text"
            id="s_lastname"
            defaultValue={perfil?.s_lastname}
            {...register("s_lastname")}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            defaultValue={perfil?.email}
            {...register("email")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            defaultValue={perfil?.password}
            {...register("password")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="role_id">Rol</label>
          <select
            id="role_id"
            defaultValue={perfil?.role_id}
            {...register("role_id")}
            required
            isDisabled = {perfil?.role_id === 4}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          >
            <option value="">Selecciona un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>

          <label htmlFor="controller_id">Controller</label>
          <select
            id="controller_id"
            defaultValue={perfil?.student?.controller.id}
            {...register("controller_id")}
            required
            isDisabled = {perfil?.role_id === 4}
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
            defaultValue={perfil?.student?.recruiter.id}
            {...register("recruiter_id")}
            required
            isDisabled = {perfil?.role_id === 4}
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
            defaultValue={perfil?.student?.country.id}
            {...register("country_id")}
            required
            isDisabled = {perfil?.role_id === 4}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          >
            <option value="">Selecciona un país</option>
            <option value="1">Honduras</option>
            <option value="2">El Salvador</option>
            <option value="3">Mexico</option>
          </select>

          <label htmlFor="school_id">Escuela</label>
          <select
            id="school_id"
            defaultValue={perfil?.schools?.[0].id}
            {...register("schools")}
            required
            isDisabled = {perfil?.role_id === 4}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          >
            <option value="">Selecciona una escuela</option>
            {schoolsList.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 h-[40px] rounded-md"
          >
            Guardar Usuario
          </button>
        </form>
      </div>
    </div>
  );
}