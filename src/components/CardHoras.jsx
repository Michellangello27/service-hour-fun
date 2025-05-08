import React, { useEffect, useState } from "react";

import EditarActividadForm from "./EditarActividadForm";
import { load, services } from "../axios/auth/login";

export default function CardHoras({ item }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { amount_reported, description, category, status, evidence } =
    item || {};
  if (!item || !item.category) {
    return (
      <div className="p-2 bg-yellow-100 text-yellow-800 rounded">
        Información incompleta para mostrar la tarjeta.
      </div>
    );
  }
  async function handleLoad(id) {
    try {
      const data = await load(id);
      console.log(data);
      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(data);
      window.open(url, "_blank");
    } catch (error) {
      console.error("error loading evidence:", error);
    }
  }

  return (
    <div className="relative border border-blue-300 rounded-xl bg-blue-50 w-70  h-fit p-1">
      <div className="rounded-xl overflow-hidden h-35">
        <img
          src={`/categorias/${category?.id}.png`}
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
      <button
        className="cursor-pointer px-2 py-1 rounded underline hover:text-blue-700 "
        onClick={() => handleLoad(item.id)}
      >
        {evidence ? "Ver documento" : "Sin documento"}
      </button>
      <p>
        <strong>Estado:</strong>
      </p>
      <p>{status}</p>
      <div className="flex justify-center  w-full ">
        {/* Boton Editar */}
        <button
          className="w-90/100 my-2 cursor-pointer border border-blue-700 rounded-md bg-violet-200 p-1 text-black hover:bg-violet-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={status !== "Pending"}
          onClick={() => setShowModalEdit(true)}
        >
          Editar
        </button>
      </div>
      {/* modal editar actividad */}
      {showModalEdit && (
        <EditarActividadForm setShowModalEdit={setShowModalEdit} item={item} />
      )}
    </div>
  );
}
