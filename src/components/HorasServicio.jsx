import React, { use } from 'react'
import { useState, useEffect } from 'react'

export default function HorasServicio() {
  const [userData, setUserData] = useState({
    carrera: '',
    grupo: '',
    nombre: '',
    correo: '',
  });

  // Funcion para obtener los datos de la api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.hs-service.api.crealape.com/api/v1/students')
        const data = await response.json()
        console.log(data)

        // Asumiendo que la API devuelve un objeto con los datos del usuario
        const user = data[0]; // Cambia esto según la estructura de tu API
        setUserData({
          carrera: user.carrera || '',
          grupo: user.grupo || '',
          nombre: user.nombre || '',
          correo: user.correo || '',
        });

      } catch (error) {
        console.log('Error al obtener los datos:', error)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='flex flex-col justify-center items-center bg-white w-full h-screen'>
        <div className='flex flex-row justify-between gap-8 mb-8'>
          <div>
            <img className="rounded-md mt-8" src="./estudiante.png" alt="" width={180} />
          </div>
          <div className='flex flex-col  items-start ml-2'>
            <label htmlFor="">Carrera al que pertenece</label>
            <input className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'></input>
            <label htmlFor="">Grupo al que pertenece</label>
            <input className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'></input>
            <label htmlFor="">Nombre del Estudiante</label>
            <input className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md truncate'></input>
            <label htmlFor="">Correo</label>
            <input className='border border-gray-400 px-4 py-2 mb-2 w-full h-10 rounded-md'></input>
          </div>
        </div>
        <div>
          <table className='border border-gray-400 w-full h-50 px-4 py-4'>
            <thead className='bg-gray-200 px-4 py-2  h-10 gap-8'>
              <tr className='border border-gray-400'>
                <th>Item</th>
                <th className='ml-2 md:ml-4'>Nombre de la Actividad</th>
                <th className='ml-2 md:ml-4'>Tipo de Servicio</th>
                <th className='ml-2 md:ml-4'>Aprobado por</th>
                <th className='ml-2 md:ml-4'>Horas Acumuladas</th>
              </tr>
            </thead>
              <tbody className=''>
                <tr>
                  <td className='text-center'>1</td>
                  <td>referir a un amigo</td>
                  <td>referir a un amigo</td>
                  <td>Jose Pelico</td>
                  <td className='text-center'>10</td>
                </tr>
                <tr>
                  <td className='text-center'>2</td>
                  <td>indexacion</td>
                  <td>indexacion</td>
                  <td>Diego Huarsaya</td>
                  <td className='text-center'>8</td>
                </tr>
                <tr>
                  <td className='text-center'>3</td>
                  <td>servicio a un amigo</td>
                  <td>servicio</td>
                  <td>Jose Pelico</td>
                  <td className='text-center'>10</td>
                </tr>
              </tbody>
            
            <tfoot className='bg-gray-200'>
              <tr className='border border-gray-400'>
                <td colSpan="4" className='text-center font-bold'>Total de horas acumuladas</td>
                <td className='text-center'>28</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </>

  )
}
