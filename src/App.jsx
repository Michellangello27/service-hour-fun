import React from "react";
import Aside from "./components/Aside";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import HorasServicio from "./components/HorasServicio";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Aside />} />
        <Route path="/login" element={<Login />} />
        <Route path="/horas-servicio" element={<HorasServicio />} />
      </Routes>
    </div>
  );
}
