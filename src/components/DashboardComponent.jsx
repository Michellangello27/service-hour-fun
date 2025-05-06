import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from './layouts/AuthLayout'
import { services } from '../axios/auth/login'
import { amountHours, aproveHours, reportedHours } from '../js/amountHours'
import { Pie, PieChart } from 'recharts'

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
        { name: 'Horas de servicio requeridas', value: amountHourschool },

        { name: 'Horas de servicio autorizadas', value: approveHours },
    ]






    return (
        <div className=' h-screen w-full flex flex-col items-center py-10 gap-2 '>
            <div className='border w-[80%] h-80 rounded-3xl flex flex-wrap justify-center items-center gap-10 py-5 px-10  bg-white'>
                <div>
                    <figure className=' border rounded-full w-30 h-30'><img src="./github-icon-2.svg" alt="" /></figure>
                </div>
                <div className='text-xl flex flex-col gap-3'>

                    <p role='full name'>{info.full_name}</p>
                    <p role='email'>{info.email}</p>
                    <p role='phone'>{info.phone}</p>
                </div>

            </div>

            <div className='border w-[80%] h-50 rounded-3xl flex gap-10 text-[12px] items-center justify-around px-1.5 bg-white' >

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
            <div role='graph cont' className='flex  gap-4 bg-gray-400'>

                {/* <div role='ultima hora registrada' className='border w-[102px] h-[102px] rounded-3xl flex flex-wrap justify-center items-center px-1 '>
                    <p className='flex justify-center items-center '>last hour card:</p>
                    <p className='flex justify-center items-center '>aprove</p>
                </div>
                <div role='avance avg' className='border w-[180px] h-[180px] rounded-3xl'>

                </div> */}


                <PieChart width={730} height={250}>
                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart>
            </div>



        </div>
    )
}
