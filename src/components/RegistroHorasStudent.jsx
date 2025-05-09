import React, { useEffect, useState } from "react";
import RegistroHorasForm from "./RegistroHorasForm";
import CardHoras from "./CardHoras";
import { services } from "../axios/servicios/servicios";

export default function RegistroHorasStudent() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    services()
      .then((rs) => setData(rs))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterData =
    filter === "Todas" ? data : data.filter((item) => item.status === filter);
  return (
    <div className="flex flex-col items-center">
      {/* botones */}
      <div className="flex flex-col gap-5 p-10 md:flex-row md:justify-between md:items-center md:w-90/100">
        <div className=" w-70 flex flex-wrap justify-between h-full md:w-130 gap-2">
          <button
            className={`w-30 cursor-pointer border border-blue-700 rounded-md hover:bg-[#A21CAF] hover:text-white p-1 md:w-28 md:h-15 ${
              filter === "Todas" ? "bg-violet-200 underline" : "bg-blue-200"
            } `}
            onClick={() => setFilter("Todas")}
          >
            Todas
          </button>
          <button
            className={`w-30 cursor-pointer border border-blue-700 rounded-md  hover:bg-[#A21CAF] hover:text-white p-1 md:w-28 md:h-15 ${
              filter === "Approved" ? "bg-violet-200 underline" : "bg-blue-200"
            } `}
            onClick={() => setFilter("Approved")}
          >
            Aprobadas
          </button>
          <button
            className={`w-30 cursor-pointer border border-blue-700 rounded-md  hover:bg-[#A21CAF] hover:text-white p-1 md:w-28 md:h-15 ${
              filter === "Rejected" ? "bg-violet-200 underline" : "bg-blue-200"
            } `}
            onClick={() => setFilter("Rejected")}
          >
            Rechazadas
          </button>
          <button
            className={`w-30 cursor-pointer border border-blue-700 rounded-md hover:bg-[#A21CAF] hover:text-white p-1 md:w-28 md:h-15 ${
              filter === "Pending" ? "bg-violet-200 underline" : "bg-blue-200"
            } `}
            onClick={() => setFilter("Pending")}
          >
            Pendientes
          </button>
        </div>
        <button
          className="cursor-pointer border border-blue-800 hover:bg-[#A21CAF] hover:text-white rounded-md bg-violet-200 p-1 md:w-30 md:h-15"
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
        {filterData.map((item, index) => {
          return <CardHoras item={item} key={index} />;
        })}
      </div>
      {/* modal formulario */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/75 flex items-center justify-center">
          <RegistroHorasForm setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
}
