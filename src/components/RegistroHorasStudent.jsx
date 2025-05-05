import React from "react";

export default function RegistroHorasStudent() {
  return (
    <div className="flex flex-col items-center">
      {/* botones */}
      <div className="flex flex-col gap-5 p-10 md:flex-row md:justify-between md:items-center md:w-90/100">
        <div className=" w-60 flex flex-wrap justify-between h-full md:w-100 gap-2">
          <button className="w-28 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-30 md:h-15">
            Todas
          </button>
          <button className="w-28 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-30 md:h-15">
            Aprobadas
          </button>

          <button className="w-28 cursor-pointer border border-blue-700 rounded-md bg-blue-100 p-1 md:w-30 md:h-15">
            Rechazadas
          </button>
        </div>
        <button className="cursor-pointer border border-blue-800 rounded-md bg-violet-200 p-1 md:w-30 md:h-15">
          Registrar
        </button>
      </div>
      {/* tarjetas */}
      <div className="flex flex-wrap justify-center gap-5 w-90/100">
        <div className="border border-blue-300 rounded-xl bg-blue-50 w-70 min-h-110 p-1">
          <div className="rounded-xl overflow-hidden h-35">
            <img
              src="ref-amigo.png"
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <p>
            <strong>Tipo de actividad:</strong>
          </p>
          <p>{"category.description"}</p>
          <p>
            <strong>Descripción de la actividad:</strong>
          </p>
          <p>{"description"}</p>
          <p>
            <strong>Horas de servicio reportadas:</strong>
          </p>
          <p>{"amount_roported"} horas</p>
          <p>
            <strong>Estado:</strong>
          </p>
          <p>{"status"}</p>
          <p>
            <strong>Comentarios:</strong>
          </p>
          <p>{"comment"}</p>
          <div className="flex justify-center">
            {/* Boton Editar */}
            <button className="w-90/100 cursor-pointer border border-blue-700 rounded-md bg-violet-200 p-1 md:w-30 md:h-15">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
