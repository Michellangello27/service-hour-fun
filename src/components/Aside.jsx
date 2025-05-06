import React from 'react'

export default function Aside() {
    return (
        <div className='flex  '>
            <div className=' flex flex-col justify-center items-center bg-gray-800 w-120 md:w-1/3 h-screen' >
                <div>
                    <img className="w-70 h-20 rounded-md" src="./logo funval.png" alt="" width={180} />
                </div>
                <div className='flex flex-col justify-center items-center mt-10'>
                    <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70'>Inicio</button>
                    <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70'>Horas de Servicio</button>
                    <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-45 w-70'>Perfil</button>
                    <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70'>Cerrar Sesion</button>
                </div>
            </div>
        </div>
    )
}
