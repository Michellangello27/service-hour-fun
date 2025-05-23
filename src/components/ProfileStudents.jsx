import React, { useState, useEffect } from "react";
import { changePassword, profile } from "../axios/auth/login";

export default function HorasServicio() {
  const [userData, setUserData] = useState({
    carrera: "",
    grupo: "",
    nombre: "",
    correo: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    profile()
      .then((rs) => {
        const user = rs;
        setUserData({
          carrera: user.schools?.[0]?.name || "Sin carrera",
          grupo: user.role?.name || "Sin grupo",
          nombre: user.full_name || "Sin nombre",
          correo: user.email || "Sin correo",
        });
      })
      .catch((error) => {
        console.error("Error al obtener los datos del perfil:", error);
      });
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = {
        old_password: currentPassword,
        new_password: newPassword,
      };
      const status = await changePassword(data);
      if (status === 200) {
        alert("Contraseña actualizada correctamente");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(
        "Error al actualizar los datos:",
        error.response || error.message
      );
      alert("Error al actualizar los datos");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-col md:mx-auto bg-white rounded-md justify-center gap-8 mb-8 md:ml-2 md:mr-2">
        <div className="flex justify-center">
          <img
            className="rounded-md mt-12 justify-center"
            src="./estudiante.png"
            alt="Estudiante"
            width={250}
          />
        </div>
        <div className="flex flex-col items-start ml-4 mr-4">
          <label htmlFor="carrera">Carrera al que pertenece</label>
          <input
            id="carrera"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
            value={userData.carrera}
            readOnly
          />
          <label htmlFor="grupo">Grupo al que pertenece</label>
          <input
            id="grupo"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
            value={userData.grupo}
            readOnly
          />
          <label htmlFor="nombre">Nombre del Estudiante</label>
          <input
            id="nombre"
            type="text"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md truncate"
            value={userData.nombre}
            readOnly
          />
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            text="text"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
            value={userData.correo}
            readOnly
          />
        </div>
        <div className="flex flex-col md:flex-col items-start ml-4 mr-4">
          <label htmlFor="">Contraseña Actual</label>
          <input
            id="currentPassword"
            type="password"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label htmlFor="">Nueva Contraseña</label>
          <input
            id="newPassword"
            type="password"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md truncate"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="">Confirmar Nueva Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full md:w-80 md:self-end mt-8 mb-8"
            onClick={handleChangePassword}
          >
            Actualizar Contraseña
          </button>
        </div>
      </div>
    </>
  );
}
