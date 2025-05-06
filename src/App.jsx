import React from "react";
import Aside from "./components/Aside";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardComponent from "./components/DashboardComponent";
import RegistroHorasStudent from "./components/RegistroHorasStudent";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<RegistroHorasStudent />} />

          {/* <Route path="/" element={<Aside />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
