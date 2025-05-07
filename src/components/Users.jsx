import { useEffect, useState } from "react";
import { deleteUsers, users } from "../axios/auth/login";

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    users()
      .then((rs) => setData(rs))
      .catch((error) => console.log(error));
  }, []);
  // console.log(data);


  function handleDelete(e) {
    console.log(e.target.id);
    const status = deleteUsers(e.target.id);
    if (status) {
      // setData((prevData) => prevData.filter((item) => item.id !== e.target.id));
      console.log("Usuario eliminado correctamente");
    } else {
      console.log("Error al eliminar el usuario");
    }



  }

  return (
    <>

      <div className="flex flex-col items-center justify-center mt-5">
        <div className="flex border w-[250px]  bg-white rounded-3xl p-2 gap-2 items-center justify-end">
          <input className="border-r" type="text" />
          <figure className="" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </figure>
        </div>

        <div role="filter" className="flex gap-2 items-center justify-end mt-5">
          <select name="" id="" className="border rounded-md p-2 bg-white">
            <option value="">Todas</option>
          </select>
          <button className="bg-white px-2 py-2.5 rounded-md" >Crear Nuevo Usuario</button>

        </div>

        <div role="cardContainer" className=" flex flex-wrap justify-center items-center gap-5 mt-5 w-full">

          <table className="border w-full text-[10px] sm:text-[15px]">
            <thead className="bg-gray-200">
              <tr>
                <th className="border">Nombre</th>
                <th className="border">Email</th>
                <th className="border">Rol</th>
                <th className="border">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((item) => {
                if(item.status === "inactivo"){
                  return
                }

                return (<tr key={item.id} className="border-b hover:bg-gray-100 h-[25px] py-5">
                  <td className="">{item.full_name}</td>
                  <td className="">{item.email}</td>
                  <td className="">{item.role.name}</td>
                  <td className=" flex gap-2 justify-center items-center ">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Editar</button>
                    <button id={item.id} onClick={(e) => handleDelete(e)} className="bg-red-500 text-white px-2 py-1 rounded-md">Eliminar</button>
                  </td>
                </tr>)

              }



              )}
            </tbody>
          </table>
          <div>

          </div>

        </div>


      </div>




    </>
  );
}
