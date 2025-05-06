import React, { createContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { logout, profile } from "../../axios/auth/login";
import Cookies from "js-cookie"; // Import js-cookie

export const ProfileContext = createContext();

export default function AuthLayout() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  console.log(data);

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
      <div className="flex bg-blue-300">
        {/* <Aside /> */}
        <aside className="flex flex-col justify-center items-center  w-120 md:w-1/3 bg-gray-800  h-screen">
          <div>
            <img
              className="w-70 h-20 rounded-md"
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
                  to={item.link}
                  className="text-white text-center text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70"
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}

            <button
              className="text-white text-2xl bg-green-500 rounded-md px-4 py-2 mb-4 w-70 cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar Sesion
            </button>
          </div>
        </aside>
        <main className="grow p-5 h-[calc(100vh-64px)] overflow-y-auto">
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
