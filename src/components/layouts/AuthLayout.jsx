import React, { createContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { logout, profile } from "../../axios/auth/login";
import Cookies from "js-cookie";

export const ProfileContext = createContext();

export default function AuthLayout() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then((rs) => setData(rs))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function handleLogout() {
    try {
      const status = await logout();
      if (status === 200) {
        Cookies.remove("token");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProfileContext.Provider value={{ data }}>
      <div className="flex bg-[#19275be2] relative  md:static">
        <div className="absolute top-5 right-5 md:hidden">
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        {/* <Aside /> */}
        <aside
          className={`z-50 flex-shrink-0 ${
            showModal
              ? "absolute top-15 right-3 w-[150px] bg-[#4e6789dd] flex flex-col items-center justify-around rounded-3xl py-5 transition-transform duration-500 ease-in-out shadow-3xl"
              : "hidden md:flex  md:flex-col md:justify-center md:items-center md:w-[170px] bg-[#4e688978] h-screen "
          }`}
        >
          <div>
            <img
              className="w-[110px]  rounded-md"
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
                  onClick={() => {
                    setShowModal(false);
                  }}
                  to={item.link}
                  className="font-semibold flex items-center justify-start gap-2 text-sm border border-blue-700 rounded-md bg-violet-200 px-4 py-2 mb-4 w-[115px] hover:bg-[#A21CAF] hover:text-white"
                  key={item.name}
                >
                  <figure className="w-5 ">
                    <img src={item.imagen} alt="" className="w-5" />
                  </figure>
                  <p className="w-full">{item.name}</p>
                </Link>
              ))}

            <button
              className=" font-bold text-center text-sm border border-blue-700 rounded-md bg-violet-200 px-4 py-2 mb-4 w-[115px] cursor-pointer hover:bg-[#A21CAF] hover:text-white"
              onClick={handleLogout}
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
  {
    name: "Home",
    roles: ["Admin", "Student"],
    link: "/",
    imagen: "/images/home1.png",
  },
  {
    name: "Horas de Servicio",
    roles: ["Student"],
    link: "/horas-servicio",
    imagen: "/images/clock1.png",
  },
  {
    name: "Perfil",
    roles: ["Admin", "Student"],
    link: "/profile",
    imagen: "/images/user1.png",
  },
  {
    name: "Usuarios",
    roles: ["Admin"],
    link: "/users",
    imagen: "/images/student.png",
  },
];
