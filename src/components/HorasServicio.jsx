
import React, { useState, useEffect } from 'react';
import { profile, services } from '../axios/auth/login';


export default function HorasServicio() {
  const [userData, setUserData] = useState({
    carrera: '',
    grupo: '',
    nombre: '',
    correo: '',
  });


  const [serviceData, setServiceData] = useState([]); // Estado para almacenar los servicios

  // Función para obtener los datos del perfil
  useEffect(() => {
    profile()
      .then((rs) => {
        const user = rs;
        setUserData({
          carrera: user.schools?.[0]?.name || 'Sin carrera',
          grupo: user.role?.name || 'Sin grupo',
          nombre: user.full_name || 'Sin nombre',
          correo: user.email || 'Sin correo',
        });
      })
      .catch((error) => {
        console.error('Error al obtener los datos del perfil:', error);
      });

    // Función para obtener los datos de los servicios
    services()
      .then((data) => {
        setServiceData(data); // Guardar los datos de los servicios en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los servicios:', error);
      });

  }, []);

  return (
    <>
      <div className='flex flex-col justify-center items-center bg-white w-full h-screen'>
        <div className='flex flex-row justify-between gap-8 mb-8'>
          <div>

            <img className="rounded-md mt-8" src="./estudiante.png" alt="Estudiante" width={180} />
          </div>
          <div className='flex flex-col items-start ml-2'>
            <label htmlFor="carrera">Carrera al que pertenece</label>
            <input
              id="carrera"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'
              value={userData.carrera}
              readOnly
            />
            <label htmlFor="grupo">Grupo al que pertenece</label>
            <input
              id="grupo"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'
              value={userData.grupo}
              readOnly
            />
            <label htmlFor="nombre">Nombre del Estudiante</label>
            <input
              id="nombre"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md truncate'
              value={userData.nombre}
              readOnly
            />
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'
              value={userData.correo}
              readOnly
            />

          </div>
        </div>
        <div>
          <table className='border border-gray-400 w-full h-50 px-4 py-4'>

            <thead className='bg-gray-200 px-4 py-2 h-10 gap-8'>

              <tr className='border border-gray-400'>
                <th>Item</th>
                <th className='ml-2 md:ml-4'>Nombre de la Actividad</th>
                <th className='ml-2 md:ml-4'>Tipo de Servicio</th>
                <th className='ml-2 md:ml-4'>Aprobado por</th>

                <th className='ml-2 md:ml-4'>Horas Reportadas</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => (
                <tr key={service.id} className='border border-gray-400'>
                  <td className='text-center'>{index + 1}</td>
                  <td>{service.description}</td>
                  <td>{service.category?.name || 'Sin categoría'}</td>
                  <td>{service.reviewer?.full_name || 'Pendiente'}</td>
                  <td className='text-center'>{service.amount_reported}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className='bg-gray-200'>
              <tr className='border border-gray-400'>
                <td colSpan="4" className='text-center font-bold'>Total de horas reportadas</td>
                <td className='text-center'>
                  {serviceData.reduce((total, service) => total + service.amount_reported, 0)}
                </td>

              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </>
  );
}

