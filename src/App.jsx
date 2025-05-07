import React from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import HorasServicio from "./components/HorasServicio";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardComponent from "./components/DashboardComponent";

import RegistroHorasStudent from "./components/RegistroHorasStudent";


import Cookies from "js-cookie"; // Import js-cookie
import { Navigate } from "react-router";
import Users from "./components/Users";
import User from "./components/User";

// Protected Route Component
/* function ProtectedRoute({ children }) {
  const token = Cookies.get("token"); // Check for the 'token' cookie
  return token ? children : <Navigate to="/login" />;
} */
/* element={
    <ProtectedRoute>
      <AuthLayout />
    </ProtectedRoute>
  } */


export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>

          <Route path="/" element={<RegistroHorasStudent />} />

          <Route path="/" element={<DashboardComponent />} />


          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/users/:id" element={<User/>} />
          <Route path="/create-user" element={<h1>Create User</h1>} />
          <Route
            path="/forbiden"
            element={<h1>No tiene Permisos para acceder a este contenido</h1>}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/horas-servicio" element={<HorasServicio />} />
      </Routes>
    </div>
  );
}
