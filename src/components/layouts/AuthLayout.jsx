import React, { createContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { logout, profile } from "../../axios/auth/login";
import Cookies from "js-cookie"; // Import js-cookie

export const ProfileContext = createContext();

export default function AuthLayout() { 
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();




  useEffect(() => {
    profile()
      .then((rs) => setData(rs))
      .catch((error) => {
        console.log(error);
        /* if (error.response && error.response.status === 401) {
          Cookies.remove("token"); // Clear the 'token' cookie
          navigate("/login"); // Redirect to login
        } */
      });
  }, []);

  async function handleLogout() {
    try {
      const status = await logout();
      if (status === 200) {
        Cookies.remove("token"); // Clear the 'token' cookie
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProfileContext.Provider value={{ data }}>
      <div className="flex bg-[#153862] relative  md:static">

        <div className="absolute top-5 right-5 md:hidden">
          <button onClick={()=>{setShowModal(!showModal)}} >


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

        </div>
        {/* <Aside /> */}
        <aside className={`z-50 flex-shrink-0 ${  showModal ? 
        "absolute top-15 right-3 w-[150px] bg-gray-500 flex flex-col items-center justify-around rounded-3xl py-5 transition-transform duration-500 ease-in-out shadow-3xl"
      : "hidden md:flex  md:flex-col md:justify-center md:items-center md:w-[150px] bg-gray-800 h-screen"
  }`}>
          <div>
            <img
              className="w-[100px]  rounded-md"
              src="./logo funval.png"
              alt=""
              width={180}
            />
          </div>

          <div className="flex flex-col justify-between items-center mt-10">
            {menuOptions
              .filter((option) => option.roles.includes(data?.role?.name))
              .map((item) => (
                <Link
                onClick={()=>{setShowModal(false)}}
                  to={item.link}
                  className="text-white text-center text-sm bg-blue-700 rounded-md px-4 py-2 mb-4 w-[100px]"
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}

            <button
              className="text-white text-center text-sm bg-blue-700 rounded-md px-4 py-2 mb-4 w-[100px] cursor-pointer"
              onClick={ handleLogout}
            >
              Cerrar Sesion
            </button>
          </div>
        </aside>
        <main className="grow p-5 h-screen overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </ProfileContext.Provider>
  );
}

const menuOptions = [
  { name: "Home", roles: ["Admin", "Student"], link: "/" },
  { name: "Horas de Servicio", roles: ["Student"], link: "/horas-servicio" },
  { name: "Profile", roles: ["Admin", "Student"], link: "/profile" },
  { name: "Users", roles: ["Admin"], link: "/users" },
  { name: "Create Users", roles: ["Admin"], link: "/create-users" },
];
