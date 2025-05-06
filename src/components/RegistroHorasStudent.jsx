import React, { useEffect, useState } from "react";
import RegistroHorasForm from "./RegistroHorasForm";
import CardHoras from "./CardHoras";
import { services } from "../axios/auth/login";

export default function RegistroHorasStudent() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  console.log(data);
  const as = data || "";
  useEffect(() => {
    services()
      .then((rs) => setData(rs))
      .catch((error) => {
        console.log(error);
        /* if (error.response && error.response.status === 401) {
          Cookies.remove("token"); // Clear the 'token' cookie
          navigate("/login"); // Redirect to login
        } */
      });
  }, []);
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
        {as !== "" &&
          as.map((item, index) => {
            return <CardHoras item={item} key={index} />;
          })}
      </div>
      {/* modal formulario */}
      {showModal && <RegistroHorasForm setShowModal={setShowModal} />}
    </div>
  );
}
