import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from './layouts/AuthLayout'
import { services } from '../axios/auth/login'
import { amountHours, aproveHours, reportedHours } from '../js/amountHours'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import CardHoras from './CardHoras'
import { aLotServiceType } from '../js/servicesFunctions'

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

    const masUsada = aLotServiceType(servicesInfo)
console.log(servicesInfo)
    const approveHours = aproveHours(servicesInfo)
    // console.log(servicesInfo[servicesInfo.length - 1])



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


            <div className=" grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-items-center mt-8">


                <div className="   ">
                    <div className='border  h-full rounded-3xl flex flex-wrap justify-center items-center gap-10 py-5 px-10  bg-[#567cbd]  text-white '>
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
                <div className="   ">

                    <div className='flex flex-col border  h-full rounded-2xl py-2.5  gap-1 text-[12px] items-center justify-around px-1.5 bg-[#567cbd]  text-white' >


                        <p className=''>Haz hecho muchas actividades de tipo</p>
                        <p role='horas esperadas' className=' text-2xl'>
                            {masUsada?.[0]}
                        </p>
                        <p className=''>Te invitamos a servir de otras maneras</p>


                    </div>


                </div>
                <div className="  md:w-[320px]   flex flex-col items-center">

                    <div className='border   rounded-3xl  flex flex-wrap  justify-center items-center gap-0 py-5 px-10  bg-[#567cbd]  text-white w-full h-full'>
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

                            <PieChart width={300} height={280}>
                                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="#b4cc1b" label />
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center py-2.5  ">


                    <CardHoras item={servicesInfo[servicesInfo?.length - 1]} />






                </div>





                <div className="   flex gap-3 justify-around items-center">

                    <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 bg-[#567cbd]  text-white'>
                        <p className=''>Horas de servicio Requeridas</p>
                        <p role='horas esperadas' className=' text-5xl'>
                            {amountHourschool}
                        </p>

                    </div>
                    <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 bg-[#567cbd]  text-white'>
                        <p>Horas de servicio Registradas</p>
                        <p role='horas registradas' className=' text-5xl'>
                            {reportHoursCounter}
                        </p>
                    </div>
                    <div className=' border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 bg-[#567cbd]  text-white'>
                        <p>Horas de servicio autorizadas</p>
                        <p role='horas autorizadas' className=' text-5xl'>
                            {approveHours}
                        </p>
                    </div>

                </div>
                <div className=" ">

                    <div className='border  h-full rounded-3xl flex flex-col justify-center items-center gap-10 py-5 px-10  bg-[#567cbd]  text-white'>
                        <p className='text-4xl text-center'> Te faltan</p>
                        <p className='text-8xl text-red-400'>{amountHourschool - approveHours}</p>
                        <p className='text-4xl text-center'>horas por cumplir</p>


                    </div>

                </div>
            </div>




        </>
    )
}
