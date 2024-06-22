import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Auth/HomePage";
import AddCoreList from "./pages/Volunteer/AddCoreList";
import AddMembershipData from "./pages/Volunteer/AddMembershipData";
import AddVolunteerList from "./pages/Volunteer/AddVolunteerList";
import Dashboard from "./pages/Volunteer/Dashboard";
import PermissionLetterPdf from "./pages/Volunteer/PermissionLetterPdf";
import EventCreation from "./pages/Volunteer/EventCreation";
import Navbar from "./components/Navbar";

import EventDescription from "./pages/Volunteer/EventDescription";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import ZipDownloader from "./pages/Volunteer/ZipDownloader";
import CoreList from "./pages/Volunteer/CoreList";
import CoreTable from "./pages/Volunteer/CoreTable";
import VolunteerTable from "./pages/Volunteer/VolunteerTable";
import MembershipTable from "./pages/Volunteer/MembershipTable";
import Register from "./pages/Volunteer/Register";
import EmailForm from "./pages/Mails/EmailForm";
import File from "./pages/File";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Team from "./pages/Auth/Team";
import EventTable from "./pages/Events/EventTable";
import EventRegistrations from "./pages/Events/EventRegistrations";
const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/file" element={<File />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/*admin side */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/event-list" element={<EventTable />} />
        <Route path="/admin/team" element={<Team />} />
        <Route
          path="/admin/registration-list/:id"
          element={<EventRegistrations />}
        />
        <Route path="/admin/send-email" element={<EmailForm />} />
        {/* volunteer side */}
        <Route path="/volunteer/team" element={<Team />} />
        <Route path="/volunteer/event-list" element={<EventTable />} />
        <Route path="/volunteer/add-core" element={<AddCoreList />} />
        <Route path="/volunteer/core" element={<CoreTable />} />
        <Route path="/volunteer/volunteer" element={<VolunteerTable />} />
        <Route path="/volunteer/membership" element={<MembershipTable />} />
        <Route
          path="/volunteer/add-membership"
          element={<AddMembershipData />}
        />
        <Route path="/volunteer/add-volunteer" element={<AddVolunteerList />} />
        <Route path="/volunteer/dashboard" element={<Dashboard />} />
        <Route
          path="/volunteer/permission-letters"
          element={<PermissionLetterPdf />}
        />
        <Route path="/volunteer/event-creation" element={<EventCreation />} />
        <Route path="/volunteer/:id" element={<EventDescription />} />
        <Route path="/register/:id" element={<Register />} />
        <Route
          path="/volunteer/registration-list/:id"
          element={<EventRegistrations />}
        />
        <Route path="/volunteer/send-email" element={<EmailForm />} />
      </Routes>
    </>
  );
};

export default App;
