import React from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardComponent from "./components/DashboardComponent";
import RegistroHorasStudent from "./components/RegistroHorasStudent";
import Users from "./components/Users";
import User from "./components/User";
import StudentsInfo from "./components/StudentsInfo";
import ActualizarUsuario from "./components/ActualizarUsuario";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/horas-servicio" element={<RegistroHorasStudent />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/students-info" element={<StudentsInfo />} />
          <Route path="/profile" element={<ActualizarUsuario />} />
          <Route
            path="/forbiden"
            element={<h1>No tiene Permisos para acceder a este contenido</h1>}
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
