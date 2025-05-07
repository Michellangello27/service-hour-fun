import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { editarActividad } from "../axios/auth/login";

export default function EditarActividadForm({ setShowModalEdit, item }) {
  const { register, handleSubmit, reset } = useForm();
  const itemId = item.id;
  console.log(itemId);
  useEffect(() => {
    if (item) {
      reset({
        amount_reported: item.amount_reported,
        description: item.description,
        category_id: item.category.id,
        evidence: item.evidence,
      });
    }
  }, [item, reset]);

  const handleEdit = async (data) => {
    try {
      const status = await editarActividad(data, itemId);
      if (status === 200) {
        alert("Actividad editada con éxito");
        setShowModalEdit(false);
      }
    } catch (error) {
      console.log("Error al editar la actividad:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center rounded-lg">
      <div className="bg-indigo-50 p-6 rounded-lg w-80 md:w-96">
        <h2 className="text-lg font-bold mb-4">Editar Actividad</h2>
        <form
          onSubmit={handleSubmit(handleEdit)}
          encType="multipart/form-data"
          className="flex flex-col gap-3"
        >
          <div>
            <label className="text-sm">Horas reportadas</label>
            <input
              type="number"
              {...register("amount_reported")}
              name="Amount_reported"
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
          <div>
            <label className="text-sm">Documento (PDF)</label>
            <input
              type="file"
              {...register("evidence")}
              accept="application/pdf"
              required
              className="border w-full p-1 rounded text-xs"
            />
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
