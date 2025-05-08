import React, { useEffect, useState } from "react";
import { services, users, findUser } from "../axios/auth/login";
import { amountHours, reportedHours, aproveHours } from "../js/amountHours";

export default function StudentsInfo() {
  const [data, setData] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [studentSchools, setStudentSchools] = useState({}); // To store school names for each student

  useEffect(() => {
    // Fetch students
    users()
      .then((rs) => {
        const rsFiltered = rs.filter(
          (user) => user.role_id === 4 && user.status === "activo"
        );
        setData(rsFiltered);

        // Fetch school data for each student
        fetchStudentSchools(rsFiltered);
      })
      .catch((error) => console.log(error));

    // Fetch services
    services()
      .then((rs) => setDataServices(rs))
      .catch((error) => console.log(error));
  }, []);

  // Auxiliary function to fetch school data for all students
  const fetchStudentSchools = async (students) => {
    const schools = {};
    for (const student of students) {
      try {
        const studentData = await findUser(student.id); // Fetch data from /users/:id
        schools[student.id] = studentData.schools
          .map((school) => school.name)
          .join(", ");
      } catch (error) {
        console.log(`Error fetching schools for student ${student.id}:`, error);
        schools[student.id] = "N/A"; // Default to "N/A" if there's an error
      }
    }
    setStudentSchools(schools); // Update state with school names
  };

  // Helper function to calculate hours for each student
  const calculateHours = (studentId) => {
    const studentServices = dataServices.filter(
      (service) => service.user.id === studentId
    );
    const approved = aproveHours(studentServices);
    const reported = reportedHours(studentServices);
    const necessary = amountHours(studentServices[0]?.category?.name || ""); // Assuming category name determines necessary hours
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
