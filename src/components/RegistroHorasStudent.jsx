import React, { useState } from "react";
import RegistroHorasForm from "./RegistroHorasForm";

export default function RegistroHorasStudent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* botones */}
      <div className="flex flex-col gap-5 p-10 md:flex-row md:justify-between md:items-center md:w-90/100">
        <div className=" w-70 flex flex-wrap justify-between h-full md:w-130 gap-2">
          <button className="w-30 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-28 md:h-15">
            Todas
          </button>
          <button className="w-30 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-28 md:h-15">
            Aprobadas
          </button>
          <button className="w-30 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-28 md:h-15">
            Rechazadas
          </button>
          <button className="w-30 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-28 md:h-15">
            Pendientes
          </button>
        </div>
        <button
          className="cursor-pointer border border-blue-800 rounded-md bg-violet-200 p-1 md:w-30 md:h-15"
          onClick={() => setShowModal(true)}
        >
          Registrar
        </button>
      </div>
      {/* tarjetas */}
      <div
        className="flex flex-wrap justify-center gap-5 w-90/100"
        id="Pending"
      >
        <div className="relative border border-blue-300 rounded-xl bg-blue-50 w-70 min-h-110 p-1">
          <div className="rounded-xl overflow-hidden h-35">
            <img
              src="/categorias/1.png"
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <p>
            <strong>Horas de servicio reportadas:</strong>
          </p>
          <p>{"amount_reported"} horas</p>
          <p>
            <strong>Descripción de la actividad:</strong>
          </p>
          <p>{"description"}</p>
          <p>
            <strong>Tipo de actividad:</strong>
          </p>
          <p>{"category_id"}</p>
          <p>
            <strong>Documento:</strong>
          </p>
          <p>AQUI PDF</p>
          <p>
            <strong>Estado:</strong>
          </p>
          <p>{"status"}</p>
          <div className="flex justify-center absolute w-full bottom-2 left-0">
            {/* Boton Editar */}
            <button className="w-90/100 my-2 cursor-pointer border border-blue-700 rounded-md bg-violet-200 p-1">
              Editar
            </button>
          </div>
        </div>
      </div>
      {/* modal formulario */}
      {showModal && <RegistroHorasForm setShowModal={setShowModal} />}
    </div>
  );
}
