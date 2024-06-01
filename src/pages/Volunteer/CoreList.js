import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CoreList = () => {
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

  const [core, setCore] = useState([]);

  useEffect(() => {
    const fetchCore = async (req, res) => {
      try {
        const res = await axios.get(
          "https://backend-production-c697.up.railway.app/api/v1/core/get-core"
        );
        setCore(res.data.coreMembers);
        
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
  });

  return (
    <div className="m-5 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Core Team</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-[#3893c2] text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Acm Membership Id</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Roll Number</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Section</th>
          </tr>
        </thead>
        <tbody>
          {coreMembers.map((member) => (
            <tr key={member.rollNumber} className="hover:bg-gray-100">
              <td className="border px-1 py-2 text-gray-900">
                {member.studentName}
              </td>
              <td className="border px-1 py-2 text-gray-900">
                {member.acmMembershipId}
              </td>
              <td className="border px-1 py-2 text-gray-900">{member.email}</td>
              <td className="border px-1 py-2 text-gray-900">
                {member.rollNumber}
              </td>
              <td className="border px-1 py-2 text-gray-900">
                {member.position}
              </td>
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

export default CoreList;
