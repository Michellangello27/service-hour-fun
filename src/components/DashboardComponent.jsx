import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./layouts/AuthLayout";
import { services } from "../axios/auth/login";
import { amountHours, aproveHours, reportedHours } from "../js/amountHours";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardHoras from "./CardHoras";
import {
  aLotServiceType,
  pendingReportsAmount,
  typeServices,
} from "../js/servicesFunctions";

export default function DashboardComponent() {
  const data = useContext(ProfileContext);

  const info = data?.data;

  // console.log(info)

  const amountHourschool = amountHours(info?.schools?.[0]?.name || "");

  const [servicesInfo, setServicesInfo] = useState([]);
  useEffect(() => {
    services()
      .then((rs) => setServicesInfo(rs))
      .catch((error) => console.log(error));
  }, []);

  const reportHoursCounter = reportedHours(servicesInfo);

  const masUsada = aLotServiceType(servicesInfo);

  const approveHours = aproveHours(servicesInfo);
  // console.log(servicesInfo[servicesInfo.length - 1])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const COLORS2 = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F"];

  const data02 = [
    { name: "Horas de servicio registradas", value: reportHoursCounter },

    { name: "Horas de servicio autorizadas", value: approveHours },
  ];

  const data01 = [
    { name: "Horas de servicio autorizadas", value: approveHours },

    {
      name: "Horas de servicio faltantes",
      value: amountHourschool - approveHours,
    },
  ];

  // console.log(servicesInfo)

  const pendientes = pendingReportsAmount(servicesInfo, "Pending");

  const typeServ = servicesInfo.length > 0 ? typeServices(servicesInfo) : [];

  const data3 = typeServ?.length
    ? typeServ.map(([nombre, datos]) => ({
        name: nombre,
        "reportes subidos": datos?.cantidadReportes ?? 0,
        "horas reportadas": datos?.totalReportado ?? 0,
      }))
    : [];

  return (
    <>
      {info.role_id === 4 && (
        <div className=" grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-items-center mt-8">
          <>
            <div className="   ">
              <div
                className="border  h-full rounded-3xl flex flex-wrap justify-center items-center gap-10 py-5 px-10  border-blue-300
bg-blue-50  text-black "
              >
                <div>
                  <figure className=" border rounded-full w-30 h-30">
                    <img src="./github-icon-2.svg" alt="" />
                  </figure>
                </div>
                <div className="text-xl flex flex-col gap-3">
                  <p role="full name">{info.full_name}</p>
                  <p role="email">{info.email}</p>
                  <p role="phone">{info.phone}</p>
                </div>
              </div>
            </div>

            <div className="  md:w-[320px]   flex flex-col items-center">
              <div
                className="border   rounded-3xl  flex flex-wrap  justify-center items-center gap-0 py-5 px-10  border-blue-300
bg-blue-50  text-black w-full h-full"
              >
                <div>
                  <ResponsiveContainer width={300} height={350}>
                    <PieChart>
                      <Legend />
                      <Pie
                        data={data02}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        fill="#8884d8"
                      >
                        {data02.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS2[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Pie
                        data={data01}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#b4cc1b"
                        label
                      >
                        {data01.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center py-2.5  ">
              <CardHoras item={servicesInfo[servicesInfo?.length - 1]} />
            </div>
            <div className="flex gap-5 flex-col-reverse justify-evenly">
              <div className="   flex gap-3 justify-around items-center">
                <div
                  className=" border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 border-blue-300
bg-blue-50  text-black"
                >
                  <p className="">Horas de servicio Requeridas</p>
                  <p role="horas esperadas" className=" text-5xl">
                    {amountHourschool}
                  </p>
                </div>
                <div
                  className=" border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 border-blue-300
bg-blue-50  text-black"
                >
                  <p>Horas de servicio Registradas</p>
                  <p role="horas registradas" className=" text-5xl">
                    {reportHoursCounter}
                  </p>
                </div>
                <div
                  className=" border w-[30%]  h-[150px]  rounded-3xl flex flex-wrap justify-center items-center py-2 px-1 border-blue-300
bg-blue-50  text-black"
                >
                  <p>Horas de servicio autorizadas</p>
                  <p role="horas autorizadas" className=" text-5xl">
                    {approveHours}
                  </p>
                </div>
              </div>
              <div className=" ">
                <div
                  className="border  h-[150px] rounded-3xl flex flex-col justify-center items-center gap-2 py-5 px-10  border-blue-300
bg-blue-50  text-black"
                >
                  <p className="text-2xl text-center"> Te faltan</p>
                  <p className="text-4xl text-red-400">
                    {amountHourschool - approveHours}
                  </p>
                  <p className="text-2xl text-center">horas por cumplir</p>
                </div>
              </div>
            </div>
          </>
        </div>
      )}

      {info.role_id === 1 && (
        <div className="flex flex-wrap  justify-center">
          <div className="border w-[150px] h-[150px] rounded-md bg-white flex flex-col justify-center items-center shadow-2xl">
            <h2 className="text-[20px] text-center">Reportes por revisar:</h2>
            <p className="text-[35px]">{pendientes}</p>
          </div>

          <ResponsiveContainer
            width="60%"
            height={300}
            className="border w-[800px] h-[250px] rounded-md bg-white flex flex-col justify-center items-center shadow-2xl "
          >
            <BarChart data={data3}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                tick={{ strokeWidth: 1, fontSize: 12 }}
                height={50}
                tickSize={10}
                dataKey="name"
              >
                <Label
                  value="Tipos de Reportes"
                  offset={3}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="reportes subidos"
                label={{ fill: "black", fontSize: 10 }}
                fill="#82ca9d"
              >
                {data3.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
              <Legend align="center" verticalAlign="top" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer
            width="60%"
            height={300}
            className="border w-[800px] h-[250px] rounded-md bg-white flex flex-col justify-center items-center shadow-2xl "
          >
            <BarChart data={data3}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                tick={{ strokeWidth: 1, fontSize: 12 }}
                height={50}
                tickSize={10}
                dataKey="name"
              >
                <Label
                  value="Tipos de Reportes"
                  offset={3}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="horas reportadas"
                label={{ fill: "black", fontSize: 10 }}
                fill="#8884d8"
              >
                {data3.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>

              <Legend align="center" verticalAlign="top" />
            </BarChart>
          </ResponsiveContainer>

          <div className="border w-[300px] h-fit rounded-md bg-white flex flex-col justify-center items-center gap-7 p-2.5 shadow-2xl">
            <h2 className="text-[20px] text-center">
              Relacion de Reportes - Horas
            </h2>
            <div className="flex flex-col items-center">
              <table className="border border-gray-400   px-4 py-4">
                <thead className="bg-gray-200 px-4 py-2 h-10 gap-8">
                  <tr className="border border-gray-400">
                    <th>Tipo de servicio</th>
                    <th className="ml-2 md:ml-4">Horas Reportadas</th>
                    <th className="ml-2 md:ml-4">Reportes Subidos</th>
                  </tr>
                </thead>
                <tbody>
                  {data3.map((item) => {
                    return (
                      <tr
                        key={item.name}
                        className="border border-gray-400 text-center"
                      >
                        <td>{item.name}</td>
                        <td>{item["horas reportadas"]}</td>
                        <td>{item["reportes subidos"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            role="prichart"
            className="border   rounded-3xl  flex flex-wrap  justify-center items-center gap-0 py-5 px-10  bg-white  text-black"
          >
            <div>
              <PieChart width={300} height={280}>
                <Pie
                  data={data02}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#b4cc1b"
                >
                  {data02.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
