import React, { useEffect, useState } from "react";
import { getDocument } from "../axios/auth/login";

export default function CardHoras({ item }) {
  const { amount_reported, description, category, status, evidence } = item || {};
  //   const [data, setData] = useState({});
  //   console.log(data);
  //   const as = data || "";
  //   useEffect(() => {
  //     getDocument(category.id)
  //       .then((rs) => setData(rs))
  //       .catch((error) => {
  //         console.log(error);
  //         /* if (error.response && error.response.status === 401) {
  //           Cookies.remove("token"); // Clear the 'token' cookie
  //           navigate("/login"); // Redirect to login
  //         } */
  //       });
  //   }, []);

  if (!item || !item.category) {
    return (
      <div className="p-2 bg-yellow-100 text-yellow-800 rounded">
        Información incompleta para mostrar la tarjeta.
      </div>
    );
  }

  return (
    <div className="relative border border-blue-300 rounded-xl bg-blue-50 w-70  h-fit p-1">
      <div className="rounded-xl overflow-hidden h-35">
        <img
          src={`/categorias/${category?.id || "default"}.png`}
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <p>
        <strong>Horas de servicio reportadas:</strong>
      </p>
      <p>{amount_reported} horas</p>
      <p>
        <strong>Descripción de la actividad:</strong>
      </p>
      <p>{description}</p>
      <p>
        <strong>Tipo de actividad:</strong>
      </p>
      <p>{category.name}</p>
      <p>
        <strong>Documento:</strong>
      </p>
      <p>{evidence}</p>
      <p>
        <strong>Estado:</strong>
      </p>
      <p>{status}</p>
      <div className="flex justify-center  w-full ">
        {/* Boton Editar */}
        <button className="w-90/100 my-2 cursor-pointer border border-blue-700 rounded-md bg-violet-200 p-1">
          Editar
        </button>
      </div>
    </div>
  );
}
