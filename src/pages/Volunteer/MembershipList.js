import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MembershipList = () => {
  const [core, setCore] = useState([]);

  useEffect(() => {
    const fetchCore = async (req, res) => {
      try {
        const res = await axios.get(
          "https://backend-production-c697.up.railway.app/api/v1/members/get-membership"
        );
        console.log(res.data.members);

        setCore(res.data.members);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchCore();
  }, [core]);

  return (
    <div className="m-5 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Membership Details
      </h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-[#3893c2] text-white">
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Roll Number</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Section</th>
          </tr>
        </thead>
        <tbody>
          {core.map((member) => (
            <tr key={member.rollNumber} className="hover:bg-gray-100">
              <td className="border px-1 py-2 text-gray-900">
                {member.firstName}
              </td>
              <td className="border px-1 py-2 text-gray-900">
                {member.lastName}
              </td>
              <td className="border px-1 py-2 text-gray-900">{member.email}</td>
              <td className="border px-1 py-2 text-gray-900">
                {member.rollNumber}
              </td>
              <td className="border px-1 py-2 text-gray-900">{member.year}</td>
              <td className="border px-1 py-2 text-gray-900">
                {member.phoneNumber}
              </td>
              <td className="border px-1 py-2 text-gray-900">
                {member.section}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembershipList;
