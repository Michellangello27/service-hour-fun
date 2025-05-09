import React, { useEffect, useState } from "react";
import { users, findUser } from "../axios/auth/login";
import { amountHours, reportedHours, aproveHours } from "../js/amountHours";
import { services } from "../axios/servicios/servicios";

export default function StudentsInfo() {
  const [data, setData] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [studentSchools, setStudentSchools] = useState({});

  useEffect(() => {
    users()
      .then((rs) => {
        const rsFiltered = rs.filter(
          (user) => user.role_id === 4 && user.status === "activo"
        );
        setData(rsFiltered);

        fetchStudentSchools(rsFiltered);
      })
      .catch((error) => console.error(error));

    services()
      .then((rs) => setDataServices(rs))
      .catch((error) => console.error(error));
  }, []);

  const fetchStudentSchools = async (students) => {
    const schools = {};
    for (const student of students) {
      try {
        const studentData = await findUser(student.id);
        schools[student.id] = studentData.schools
          .map((school) => school.name)
          .join(", ");
      } catch (error) {
        console.error(
          `Error fetching schools for student ${student.id}:`,
          error
        );
        schools[student.id] = "N/A";
      }
    }
    setStudentSchools(schools);
  };

  const calculateHours = (studentId) => {
    const studentServices = dataServices.filter(
      (service) => service.user.id === studentId
    );
    const approved = aproveHours(studentServices);
    const reported = reportedHours(studentServices);
    const necessary = amountHours(studentServices[0]?.category?.name || "");
    return `${approved}/${reported}/${necessary}`;
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Students Info</h1>
      <div className="w-full overflow-x-auto max-w-5xl">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Estudiante
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Carrera
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Horas de Servicio (A/R/N)
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {data.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {`${student.f_name} ${student.m_name || ""} ${
                    student.f_lastname
                  } ${student.s_lastname || ""}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {studentSchools[student.id] || "Loading..."}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {calculateHours(student.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
