import { useEffect, useState } from "react";
import { deleteUsers, users, services } from "../axios/users/users";
import HorasServicio from "./HorasServicio";
import { set } from "react-hook-form";
import NewContactForm from "./NewContactForm";

export default function Users() {
  const [data, setData] = useState([]);
  const [srv, setSrv] = useState();
  const [toggleRequired, setToggleRequired] = useState(false)
  const [reviewUser, setReviewUser] = useState("")
  const [createUserToggle, setCreateUserToggle] = useState(false)

  // const atentionRequired = srv?.filter((item) => item.status === "Pending").map((item) => item.user.id)
  const atentionRequired = []

  // console.log(atentionRequired)


  useEffect(() => {
    users()
      .then((rs) => setData(rs))
      .catch((error) => console.log(error));
  }, [data]);
  // console.log(data);


  // console.log(data)

  useEffect(() => {
    services()
      .then((srv) => setSrv(srv))
      .catch((error) => console.log(error));





  }, []);


  function handleToggleRequired(e) {

    setToggleRequired(true)
    setReviewUser(e.target.id)

  }



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
      <div className="relative">

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
            <button className="bg-white px-2 py-2.5 rounded-md" onClick={() => setCreateUserToggle(true)} >Crear Nuevo Usuario</button>

          </div>

          <div role="cardContainer" className=" flex flex-wrap justify-center items-center gap-5 mt-5 w-full">

            <table className="border w-full text-[10px] sm:text-[15px]">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border">Nombre</th>
                  <th className="border">Email</th>
                  <th className="border">Rol</th>
                  <th className="border">Pendientes <br /> de revision</th>
                  <th className="border">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data
                  .filter((item) => item.status !== "inactivo")
                  .map((item) => {
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100 h-[25px] py-5">
                        <td className="">{item.full_name}</td>
                        <td className="">{item.email}</td>
                        <td className="">{item.role.name}</td>
                        <td className="">
                          {srv?.some(
                            (itemSrv) =>
                              itemSrv.status === "Pending" && item.id === itemSrv.user.id
                          ) ?
                            "Necesita Atención"
                            :
                            "Sin pendientes"}
                        </td>
                        <td className="" colSpan="2">
                          <div className="flex gap-2 h-full items-center justify-center"> 
                            <button className="bg-blue-500 text-white px-2 py-2  rounded-md"
                              onClick={(e) => handleToggleRequired(e)}
                              id={item.id}>
                              Revisar
                            </button>
                            <button
                              id={item.id}
                              onClick={(e) => handleDelete(e)}
                              className="bg-red-500  text-white px-2 py-2 rounded-md"
                            >
                              Eliminar
                            </button>
                          </div>

                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div>

            </div>

          </div>


        </div>

        {/* <HorasServicio /> */}
        {toggleRequired === true &&
          <div className={` w-full h-screen absolute top-0 right-0 overflow-y-auto `}>
            <HorasServicio
              reviewUser={reviewUser}
              setToggleRequired={setToggleRequired} />

          </div>
        }


        {createUserToggle === true &&

          <div role="NewContact" className="border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[550px] h-[500px] bg-white overflow-x-auto ">
            <NewContactForm
              setCreateUserToggle={setCreateUserToggle}
            />
          </div>}



      </div>




    </>
  );
}
