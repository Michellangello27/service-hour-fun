import React from "react";
import { revisionHorasServicio } from "../axios/users/users";
import { useForm } from "react-hook-form";

export default function RevisionHoras({ item, setToggleReview, fetchData }) {
  const { register, handleSubmit } = useForm();

  const handleReview = async (requestData) => {


    try {
      const { status } = await revisionHorasServicio(requestData, item.id);
      if (status === "success") {
        alert("Actividad revisada con éxito");
        setToggleReview(false);
        fetchData()

      }
    } catch (error) {
      console.log("Error al revisar:", error);
    }
  };
  return (
    <div className="w-70 border border-gray-400 rounded-xl ">
      <form
        onSubmit={handleSubmit(handleReview)}
        className="flex flex-col gap-1  shadow-lg p-6 rounded-md "
      >
        <label>Observaciones</label>
        <input
          type="text"
          {...register("comment")}
          className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
        />
        <label>Estado</label>
        <select
          className="border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md"
          {...register("status")}
        >
          <option value="">Seleccione una Opcion</option>
          <option value="1">Aprobar</option>
          <option value="2">Rechazar</option>
        </select>
        <label className="text-sm">Horas Aprobadas</label>
        <input
          type="number"
          {...register("amount_approved", { valueAsNumber: true })}
          className="border w-full p-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-3 py-1 rounded cursor-pointer"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
