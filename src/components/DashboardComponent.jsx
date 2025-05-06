import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from './layouts/AuthLayout'
import { services } from '../axios/auth/login'
import { amountHours, aproveHours, reportedHours } from '../js/amountHours'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

export default function DashboardComponent() {

    const data = useContext(ProfileContext)

    const info = data?.data


    const amountHourschool = amountHours(info?.schools?.[0]?.name || '');



    const [servicesInfo, setServicesInfo] = useState({})
    useEffect(() => {
        services()
            .then((rs) => setServicesInfo(rs))
            .catch((error) => console.log(error))
    }, [])

    const reportHoursCounter = reportedHours(servicesInfo)


    const approveHours = aproveHours(servicesInfo)



    const data02 = [
        { name: 'Horas de servicio registradas', value: reportHoursCounter },

        { name: 'Horas de servicio autorizadas', value: approveHours },
    ]

    const data01 = [
        { name: 'Horas de servicio requeridas', value: approveHours },

        { name: 'Horas de servicio faltantes', value: amountHourschool - approveHours },
    ]







    return (


        <>


            <div className="grid grid-cols-5 grid-rows-5 gap-1 justify-items-center">
                <div className="col-span-2 row-span-3   ">
                    <div className='border  h-full rounded-3xl flex flex-wrap justify-center items-center gap-10 py-5 px-10  bg-white'>
                        <div>
                            <figure className=' border rounded-full w-30 h-30'><img src="./github-icon-2.svg" alt="" /></figure>
                        </div>
                        <div className='text-xl flex flex-col gap-3'>

                            <p role='full name'>{info.full_name}</p>
                            <p role='email'>{info.email}</p>
                            <p role='phone'>{info.phone}</p>
                        </div>

                    </div>
                </div>
                <div className="col-span-3 row-span-2 col-start-3 ">

                    <div className='border  h-full rounded-3xl flex gap-10 text-[12px] items-center justify-around px-1.5 bg-white' >

                        <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 '>
                            <p className=''>Horas de servicio Requeridas</p>
                            <p role='horas esperadas' className=' text-5xl'>
                                {amountHourschool}
                            </p>
                        </div>
                        <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 '>
                            <p>Horas de servicio Registradas</p>
                            <p role='horas registradas' className=' text-5xl'>
                                {reportHoursCounter}
                            </p>
                        </div>
                        <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 '>
                            <p>Horas de servicio autorizadas</p>
                            <p role='horas autorizadas' className=' text-5xl'>
                                {approveHours}
                            </p>
                        </div>
                    </div>


                </div>
                <div className="col-span-2 row-span-2 col-start-3 row-start-3 bg-amber-50 w-full flex flex-col items-center">
                    <p>Pie Chart</p>
                    <div className='border  h-80 rounded-3xl flex  justify-center items-center gap-10 py-5 px-10  bg-white'>
                        <div>

                            <div className='flex items-center gap-2 ' >
                                <div className=' w-[30px] h-[10px] bg-[#b4cc1b] ' >

                                </div>
                                <p>Aprobadas - Restantes </p>

                            </div>
                            <div className='flex items-center gap-2 ' >
                                <div className=' w-[30px] h-[10px] bg-[#8884d8] ' >

                                </div>
                                <p>Registradas - Aprobadas </p>

                            </div>
                        </div>

                        <div>

                            <PieChart width={250} height={250}>
                                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="#b4cc1b" label />
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 row-span-2 row-start-4 bg-amber-50 w-full">4     CARD DE ULTIMA HORA CARGADA</div>
                <div className="col-span-2 col-start-3 row-start-5 bg-amber-50 w-full flex gap-3 justify-around items-center">

                    <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 bg-white'>
                        <p className=''>Horas de servicio Requeridas</p>
                        <p role='horas esperadas' className=' text-5xl'>
                            {amountHourschool}
                        </p>
                        
                    </div>
                    <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 bg-white'>
                            <p>Horas de servicio Registradas</p>
                            <p role='horas registradas' className=' text-5xl'>
                                {reportHoursCounter}
                            </p>
                        </div>
                        <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 bg-white'>
                            <p>Horas de servicio autorizadas</p>
                            <p role='horas autorizadas' className=' text-5xl'>
                                {approveHours}
                            </p>
                        </div>

                </div>
                <div className="row-span-3 col-start-5 row-start-3 bg-amber-50 w-full">

                    <div className='border  h-full rounded-3xl flex flex-col justify-center items-center gap-10 py-5 px-10  bg-white'>
                        <p className='text-4xl text-center'> Te faltan</p>
                        <p className='text-8xl text-red-400'>{amountHourschool - approveHours}</p>
                        <p className='text-4xl text-center'>horas por cumplir</p>


                    </div>

                </div>
            </div>




        </>
    )
}
