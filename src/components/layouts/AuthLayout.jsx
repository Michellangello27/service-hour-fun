import React, { createContext, useContext, useEffect, useState } from 'react'
import Aside from '../Aside'
import { Link, Outlet, useNavigate } from 'react-router'
import { logout, profile } from '../../axios/auth/login'


export const ProfileContext = createContext()


export default function AuthLayout() {





    const [data, setData] = useState({})
    // useEffect(() => {
    //     profile()
    //         .then((rs) => setData(rs))
    //         .catch((error) => console.log(error))
    // }, [])


    const navigate = useNavigate() 
    async function handleLogout() {
        try {
            const status = await logout()
            if (status === 200) {
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ProfileContext.Provider value={{ data }}>



            <div className='flex bg-blue-300'>
                {/* <Aside /> */}
                <aside className='flex flex-col justify-center items-center  w-120 md:w-1/3 bg-gray-800  h-screen' >

                    <div>
                        <img className="w-70 h-20 rounded-md" src="./logo funval.png" alt="" width={180} />
                    </div>
                    <div className='flex flex-col justify-center items-center mt-10'>
                        <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70'> <Link to={"/"}>Inicio</Link></button>
                        <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70'>Horas de Servicio</button>
                        <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-45 w-70'>Perfil</button>
                        <button className='text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70' onClick={handleLogout} >Cerrar Sesion</button>
                    </div>

                    {/* <Link to="/">Home</Link> */}
                    {/* <Link to="/profile">Profile</Link>
                    <Link to="/users">Users</Link> */}
                </aside>
                <main className='grow p-5 h-[calc(100vh-64px)] overflow-y-auto'>
                    <Outlet />
                    
                </main>

            </div>
        </ProfileContext.Provider>
    )
}
