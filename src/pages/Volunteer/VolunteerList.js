import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VolunteerList = ({ batch }) => {
  const [core, setCore] = useState([]);

  useEffect(() => {
    const fetchCore = async () => {
      try {
        const res = await axios.get(
          "https://backend-production-c697.up.railway.app/api/v1/volunteer/get-volunteer"
        );
        console.log(res.data.coreMembers);

        setCore(res.data.coreMembers);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchCore();
  }, []);

  const filteredCore = core.filter((member) => member.batch === batch);
  console.log(batch);

  return (
    <div className="m-5 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Core Team</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-[#3893c2] text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Roll Number</th>
            <th className="px-4 py-2">Domain</th>
            <th className="px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredCore.map((member) => (
            <tr key={member.rollNumber} className="hover:bg-gray-100">
              <td className="border px-1 py-2 text-gray-900">
                {member.studentName}
              </td>
              <td className="border px-1 py-2 text-gray-900">{member.email}</td>
              <td className="border px-1 py-2 text-gray-900">
                {member.rollNumber}
              </td>
              <td className="border px-1 py-2 text-gray-900">
                {member.domain}
              </td>
              <td className="border px-1 py-2 text-gray-900">
                {member.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerList;
