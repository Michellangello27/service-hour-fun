import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getCountries,
  getRoles,
  getSchoolsList,
  getUserByRol,
} from "../axios/users/users";
import { findUser, profile, update } from "../axios/auth/login";

export default function ActualizarUsuario({
  idEditProfile,
  setToggleEditProfile,
  fetchData,
}) {
  const { register, handleSubmit, reset, watch } = useForm();
  const [roles, setRoles] = useState([]);
  const [controllerList, setControllerList] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [recruiterList, setRecruiterList] = useState([]);
  const [perfil, setPerfil] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const userId = idEditProfile || perfil?.id;
  const isStudent = perfil?.role_id === 4;
  const isAdmin = perfil?.role_id === 1;
  const selectedRoleId = watch("role_id");

  // Función para manejar la actualización del usuario
  async function handleUserUpdate(requestData) {
    try {
      requestData.schools = [requestData.schools];

      const status = await update(requestData, userId);
      if (status === 200 || status === 201) {
        alert("Usuario actualizado con éxito");
        if (idEditProfile) fetchData();
        if (setToggleEditProfile) setToggleEditProfile(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar usuario");
    }
  }

  // Cargar roles, controladores, reclutadores y escuelas
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = idEditProfile
          ? await findUser(idEditProfile)
          : await profile();
        setPerfil(data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };

    fetchPerfil();
  }, [idEditProfile]);

  useEffect(() => {
    getRoles()
      .then((rol) => setRoles(rol))
      .catch((error) => console.error(error));

    getCountries()
      .then((ct) => setCountriesList(ct))
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

  useEffect(() => {
    if (perfil && perfil.id) {
      reset({
        f_name: perfil?.f_name || "",
        m_name: perfil?.m_name || "",
        f_lastname: perfil?.f_lastname || "",
        s_lastname: perfil?.s_lastname || "",
        email: perfil?.email || "",
        role_id: perfil?.role_id || "",
        controller_id: perfil?.student?.controller?.id || "",
        recruiter_id: perfil?.student?.recruiter?.id || "",
        country_id: perfil?.student?.country?.id || "",
        schools: perfil?.schools?.[0]?.id || "",
      });
    }
  }, [perfil, reset]);

  return (
    <div>
      <div className="flex flex-col border justify-center items-center bg-white w-full h-full py-5 relative">
        {setToggleEditProfile && (
          <div className="absolute top-2 right-4">
            <figure
              className="size-6 cursor-pointer"
              onClick={() => setToggleEditProfile(false)}
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
        )}

        <h2 className="font-semibold text-3xl">Actualizar Usuario</h2>
        <form
          className="flex flex-wrap border gap-1 mt-4 w-[90%] max-w-[450px] justify-center bg-white shadow-lg p-6 rounded-md"
          onSubmit={handleSubmit(handleUserUpdate)}
        >
          <label htmlFor="f_name">Primer Nombre</label>
          <input
            type="text"
            id="f_name"
            {...register("f_name")}
            required
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md"
          />

          <label htmlFor="m_name">Segundo Nombre</label>
          <input
            type="text"
            id="m_name"
            {...register("m_name")}
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

          <label htmlFor="role_id">Rol</label>
          <select
            id="role_id"
            {...register("role_id")}
            required
            disabled={isStudent && !idEditProfile}
            className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
          >
            <option value="">Selecciona un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>

          {selectedRoleId !== "1" && !isAdmin && (
            <>
              <label htmlFor="controller_id">Controller</label>
              <select
                id="controller_id"
                {...register("controller_id")}
                required
                disabled={isStudent && !idEditProfile}
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
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
                disabled={isStudent && !idEditProfile}
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
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
                disabled={isStudent && !idEditProfile}
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
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
                disabled={isStudent && !idEditProfile}
                className="border border-gray-400 px-4 mb-2 w-full h-10 rounded-md disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
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
            className="mt-5 bg-blue-500 text-white px-4 h-[40px] rounded-md hover:cursor-pointer"
          >
            Guardar Usuario
          </button>
        </form>
      </div>
    </div>
  );
}
