import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Core = () => {
  const [coreMembers, setCoreMembers] = useState([]);

  useEffect(() => {
    // Fetch core members from the backend
    const fetchCoreMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/members/volunteer-list"
        );
        setCoreMembers(response.data);
      } catch (error) {
        console.error("Error fetching core members:", error);
      }
    };

    fetchCoreMembers();
  }, []);

  return (
    <div className="ml-64 mr-20">
      <h1 className="text-2xl font-bold mb-4">Volunteer Details</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">LinkedIn Profile</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Team</th>
            <th className="px-4 py-2">Batch</th>
          </tr>
        </thead>
        <tbody>
          {coreMembers.map((member) => (
            <tr key={member._id} className="hover:bg-gray-100">
              <td className="border px-1 py-2 text-gray-900">{member.name}</td>
              <td className="border px-1 py-2 text-gray-900">
                <Link
                  to={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:underline"
                >
                  {member.linkedin}
                </Link>
              </td>
              <td className="border px-1 py-2 text-gray-900">{member.email}</td>
              <td className="border px-1 py-2 text-gray-900">{member.team}</td>

              <td className="border px-1 py-2 text-gray-900">{member.batch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Core;
