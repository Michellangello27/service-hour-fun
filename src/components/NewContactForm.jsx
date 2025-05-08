import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { createUser, getRoles, getSchoolsList, getUserByRol } from '../axios/users/users';

export default function NewContactForm({ setCreateUserToggle }) {

    const { register, handleSubmit } = useForm();
    const [roles, setRoles] = useState([]);
    const [controllerList, setControllerList] = useState([]);
    const [schoolsList, setSchoolsList] = useState([]);
    const [recruiterList, setRecruiterList] = useState([]);


    async function handleUserCreate(requestData) {
        try {

            requestData.schools = [requestData.schools];
            console.log(requestData);

            const data = await createUser(requestData);
            console.log(data);
            if (data === 201) {
                setCreateUserToggle(false);
                alert("Usuario registrado con éxito");
            }
        } catch (error) {
            console.log("Error al registrar usuario:", error);
        }
    }

    useEffect(() => {
        getRoles()
            .then((rol) => setRoles(rol))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      getUserByRol(2) // obtener rol de controller
            .then((contro) => setControllerList(contro))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        getSchoolsList() // obtener lista de escuelas
              .then((sch) => setSchoolsList(sch))
              .catch((error) => console.log(error));
      }, []);
      useEffect(() => {
        getUserByRol(3) // obtener rol de reclutador
              .then((rec) => setRecruiterList(rec))
              .catch((error) => console.log(error));
      }, []);
  


    return (
        <div>
            <div className='flex flex-col justify-center items-center bg-white w-full h-full py-5  relative' >

                <div className='absolute top-2 right-4'>
                    <figure className='size-6 cursor-pointer' onClick={() => setCreateUserToggle(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </figure>
                </div>

                <h2>Nuevo Usuario</h2>
                <form className='flex flex-col gap-1 mt-4 w-[90%] md:w-[50%] lg:w-[30%] bg-white shadow-lg p-6 rounded-md'
                    onSubmit={handleSubmit(handleUserCreate)}>


                    <label htmlFor="f_name">Primer Nombre</label>
                    <input type="text" id="f_name" {...register("f_name")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md' />

                    <label htmlFor="s_name">Segundo Nombre</label>
                    <input type="text" id="s_name" {...register("s_name")} className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md' />

                    <label htmlFor="f_lastname">Primer Apellido</label>
                    <input type="text" id="f_lastname" {...register("f_lastname")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md' />

                    <label htmlFor="s_lastname">Segundo Apellido</label>
                    <input type="text" id="s_lastname" {...register("s_lastname")} className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md' />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md' />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" {...register("password")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md' />

                    <label htmlFor="role_id">Rol</label>
                    <select id="role_id" {...register("role_id")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md'>
                        <option value="" selected>Selecciona un rol</option>
                        {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>{rol.name}</option>
                        
                        ))}
                    </select>

                    <label htmlFor="controller_id">Controller</label>
                    <select id="controller_id" {...register("controller_id")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md'>
                        <option value="" selected>Selecciona un Controller</option>                        
                        {
                        controllerList.filter((controller) => controller.status === "activo").map((controller) => (
                            <option key={controller.id} value={controller.id}>{controller.full_name}</option>
                        ))
                        }
                    </select>
                    <label htmlFor="recruiter_id">Reclutador</label>
                    <select id="recruiter_id" {...register("recruiter_id")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md'>
                        <option value="" selected>Selecciona un reclutador</option>
                        {
                            recruiterList.filter((recruiter) => recruiter.status === "activo").map((recruiter) => (
                                <option key={recruiter.id} value={recruiter.id}>{recruiter.full_name}</option>
                            ))
                        }

</select>
                    <label htmlFor="country_id">Pais</label>
                    <select id='country_id' {...register("country_id")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md'>
                        <option value="" selected>Selecciona un país</option>
                        <option value="1">Honduras</option>
                        <option value="2">El Salvador</option>
                        <option value="3">Mexico</option>
                    </select>

                    <label htmlFor="school_id">Escuela</label>
                    <select id='school_id' {...register("schools")} required className='border border-gray-400 px-4  mb-2 w-full h-10 rounded-md'>
                        <option value="" selected>Selecciona una escuela</option>
                        {
                            schoolsList.map((school) => (
                                <option key={school.id} value={school.id}>{school.name}</option>
                            ))
                        }
                    </select>




                    <button type="submit" className='bg-blue-500 text-white px-4  rounded-md'
                    >Crear Usuario</button>
                </form>

            </div>

        </div>
    )
}
