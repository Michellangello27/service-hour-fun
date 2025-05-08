
import React, { useState, useEffect } from 'react';
import { findUser } from '../axios/auth/login';
import { set } from 'react-hook-form';
import { servicesIdUser } from '../axios/users/users';


export default function HorasServicio({ reviewUser, setToggleRequired }) {
  const [userData, setUserData] = useState([]);

  const [serviceData, setServiceData] = useState([]); // Estado para almacenar los servicios

  // Función para obtener los datos del perfil

  useEffect(() => {
    findUser(reviewUser)
      .then((rs) => setUserData(rs))
      .catch((error) => console.log(error));
  }, []);



  useEffect(() => {
    servicesIdUser(reviewUser)
      .then((data) => {
        setServiceData(data); // Guardar los datos de los servicios en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los servicios:', error);
      });
  }, []);




  return (
    <>
      <div className='flex flex-col justify-center items-center bg-white w-full h-screen relative'>
        <div className='flex flex-row justify-between gap-8 mb-8'>
          <div>

            <img className="rounded-md mt-8" src="./estudiante.png" alt="Estudiante" width={180} />
          </div>
          <div className='flex flex-col items-start ml-2'>
            <label htmlFor="carrera">Carrera al que pertenece</label>
            <input
              id="carrera"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'
              value={userData?.schools?.[0]?.name || 'Sin carrera'}
              readOnly
            />
            <label htmlFor="grupo">Grupo al que pertenece</label>
            <input
              id="grupo"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'
              value={userData?.role?.name}
              readOnly
            />
            <label htmlFor="nombre">Nombre del Estudiante</label>
            <input
              id="nombre"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md truncate'
              value={userData?.full_name}
              readOnly
            />
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'
              value={userData?.email}
              readOnly
            />

          </div>
        </div>
        <div className='w-[800px] h-[350px] overflow-y-auto'>
          <table className='border border-gray-400   px-4 py-4'>

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


        <div className='absolute top-10 right-10'>
          <figure className='size-6 cursor-pointer' onClick={() => setToggleRequired(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

          </figure>
        </div>
      </div>

    </>
  );
}

