import React from "react";
import { useForm } from "react-hook-form";
import { registroHoras } from "../axios/auth/login";

export default function RegistroHorasForm({ setShowModal }) {
  const { register, handleSubmit } = useForm({
    defaultValues: async () => await registroHoras(),
  });

  const onSubmit = async (profile) => {
    try {
      profile.status = 1;
      const status = await update(profile, profile.id);
      if (status === 200) {
        alert("Horas registradas con exito");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center rounded-lg">
      <div className="bg-indigo-50 p-6 rounded-lg w-80 md:w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Nueva Actividad</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label className="text-sm">Horas reportadas</label>
            <input
              type="number"
              {...register("Amount_reported")}
              name="Amount_reported"
              required
              className="border w-full p-1 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Descripción</label>
            <input
              type="text"
              {...register("Description")}
              required
              className="border w-full p-1 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tipo de actividad</label>
            <select
              {...register("Category_id")}
              required
              className="border w-full p-1 rounded"
            >
              <option value="">Seleccione una opción</option>
              <option value="Indexacion">Indexación</option>
              <option value="Instructor">Instructor</option>
              <option value="Liderazgo">Liderazgo</option>
              <option value="Revision">Revisión</option>
              <option value="Asistencia al templo">Asistencia al templo</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Documento (PDF)</label>
            <input
              type="file"
              {...register("Document")}
              accept="application/pdf"
              className="border w-full p-1 rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
