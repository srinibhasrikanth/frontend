import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Core = () => {
  // const [coreMembers, setCoreMembers] = useState([]);
  const coreMembers = [
    {
      rollNumber: "20071A1216",
      studentName: "Shravani Garine",
      acmMembershipId: 2827587,
      position: "Chair person",
      email: "garineshravani27@gmail.com",
      phoneNumber: 6305228854,
      section: 1,
    },
    {
      rollNumber: "20071A1228",
      studentName: "Akhil KVK",
      acmMembershipId: 1179568,
      position: "Vice chair person",
      email: "kvkakhil@gmail.com",
      phoneNumber: 7989765743,
      section: 1,
    },
    {
      rollNumber: "20071A1214",
      studentName: "Sravani Gandla",
      acmMembershipId: 2046843,
      position: "Membership chair",
      email: "sravanishannu2003@gmail.com",
      phoneNumber: 9030239207,
      section: 1,
    },
    {
      rollNumber: "20071A1226",
      studentName: "Sai Vamshi Kola",
      acmMembershipId: 9090074,
      position: "Secretary",
      email: "saivamshikola@gmail.com",
      phoneNumber: 9492211719,
      section: 1,
    },
    {
      rollNumber: "20071A1215",
      studentName: "Avighna Gandra",
      acmMembershipId: 8009046,
      position: "Webmaster",
      email: "gandra.avighna@gmail.com",
      phoneNumber: 9023024025,
      section: 1,
    },
    {
      rollNumber: "20071A1278",
      studentName: "Dhanush Gummadavalli",
      acmMembershipId: 7965449,
      position: "Treasurer",
      email: "dhanushg25@gmail.com",
      phoneNumber: 9398060251,
      section: 2,
    },
    {
      rollNumber: "20071A1263",
      studentName: "Anirudh Bukka",
      acmMembershipId: 6687457,
      position: "Coding Team Head",
      email: "anirudh.bukka@gmail.com",
      phoneNumber: 7799690903,
      section: 2,
    },
    {
      rollNumber: "20071A1222",
      studentName: "Sanjana Gunturu",
      acmMembershipId: 5392381,
      position: "Design Team Head",
      email: "sanjanagunturu@gmail.com",
      phoneNumber: 8555064667,
      section: 1,
    },
    {
      rollNumber: "20071A12E6",
      studentName: "Samhith Reddy Kosana",
      acmMembershipId: 5016727,
      position: "Events and PR team Head",
      email: "samhithreddy287@gmail.com",
      phoneNumber: 6281273955,
      section: 3,
    },
    {
      rollNumber: "20071A1293",
      studentName: "Akshitha Mashetty",
      acmMembershipId: 4180300,
      position: "Social Media Team Head",
      email: "mashettyakshitha@gmail.com",
      phoneNumber: 8374543316,
      section: 2,
    },
    {
      rollNumber: "20071A1266",
      studentName: "Sri Varshitha Balthu",
      acmMembershipId: 4805526,
      position: "Technical Team Head",
      email: "srivarshitha1010@gmail.com",
      phoneNumber: 8688212278,
      section: 2,
    },
    {
      rollNumber: "20071A1288",
      studentName: " K Naga Sai Nithin",
      acmMembershipId: 7885738,
      position: "Activities Coordinator",
      email: "nagasainithin37@gmail.com",
      phoneNumber: 8688340024,
      section: 2,
    },
  ];
  // useEffect(() => {
  //   // Fetch core members from the backend
  //   const fetchCoreMembers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/v1/members/volunteer-list"
  //       );
  //       setCoreMembers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching core members:", error);
  //     }
  //   };

  //   fetchCoreMembers();
  // }, []);

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
