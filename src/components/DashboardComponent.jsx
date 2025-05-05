import React from 'react'

export default function DashboardComponent() {
    return (
        <div className=' h-screen w-full flex flex-col items-center py-10 gap-2'>
            <div className='border w-[80%] h-80 rounded-3xl flex flex-wrap justify-center items-center gap-10 py-5 px-10 '>
                <div>
                    <figure className=' border rounded-full w-30 h-30'><img src="./github-icon-2.svg" alt="" /></figure>
                </div>
                <div className='text-xl flex flex-col gap-3'>

                    <p role='full name'>Marisa Luigi Connelly Kuphal</p>
                    <p role='email'>kenyatta.boehm@yahoo.com</p>
                    <p role='phone'>(720) 231-2533</p>
                </div>

            </div>

            <div className='border w-[80%] h-50 rounded-3xl flex gap-10 text-[12px] items-center justify-around px-1.5' >

                <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 '>
                    <p className=''>Horas de servicio Requeridas</p>
                    <p role='horas esperadas' className=' text-5xl'>
                        20
                    </p>
                </div>
                <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 '>
                    <p>Horas de servicio Requeridas</p>
                    <p role='horas registradas' className=' text-5xl'>
                        15
                    </p>
                </div>
                <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 '>
                    <p>Horas de servicio autorizadas</p>
                    <p role='horas autorizadas' className=' text-5xl'>
                        10
                    </p>
                </div>
            </div>
            <div role='graph cont' className='flex  gap-4'>

                <div role='ultima hora registrada' className='border w-[102px] h-[102px] rounded-3xl flex flex-wrap justify-center items-center px-1 '>
                    <p className='flex justify-center items-center '>last hour card:</p>
                    <p className='flex justify-center items-center '>aprove</p>
                </div>
                <div role='avance avg' className='border w-[180px] h-[180px] rounded-3xl'>


              




                </div>
            </div>



        </div>
    )
}
