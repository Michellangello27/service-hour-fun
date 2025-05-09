import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { editarActividad } from "../axios/auth/login";
import { useNavigate } from "react-router";

export default function EditarActividadForm({ setShowModalEdit, item }) {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (item) {
      reset({
        amount_reported: item.amount_reported,
        description: item.description,
        category_id: item.category.id,
      });
    }
  }, [item, reset]);

  async function handleEdit(requestData) {
    try {
      const status = await editarActividad(requestData, item.id);
      if (status === 200) {
        alert("Actividad editada con éxito");
        setShowModalEdit(false);
        navigate(0);
      }
    } catch (error) {
      console.log("Error al editar la actividad:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center rounded-lg">
      <div className="bg-indigo-100 p-6 rounded-lg w-80 md:w-96">
        <h2 className="text-lg font-bold mb-4">Editar Actividad</h2>
        <form
          onSubmit={handleSubmit(handleEdit)}
          className="flex flex-col gap-3"
        >
          <div>
            <label className="text-sm">Horas reportadas</label>
            <input
              type="number"
              {...register("amount_reported", { valueAsNumber: true })}
              required
              className="border w-full p-1 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Descripción</label>
            <input
              type="text"
              {...register("description")}
              required
              className="border w-full p-1 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tipo de actividad</label>
            <select
              {...register("category_id")}
              required
              className="border w-full p-1 rounded"
            >
              <option value="">Seleccione una opción</option>
              <option value="1">Indexación</option>
              <option value="2">Instructor</option>
              <option value="3">Liderazgo</option>
              <option value="4">Revisión</option>
              <option value="5">Asistencia al templo</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
              onClick={() => setShowModalEdit(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-400 text-white px-3 py-1 rounded cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
