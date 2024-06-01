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
import Footer from "./components/Footer";
import Core from "./pages/Admin/Core";
import Memberships from "./pages/Admin/Memberships";
import Volunteers from "./pages/Admin/Volunteers";
import Events from "./pages/Admin/Events";
import Letters from "./pages/Admin/Letters";
import FileUploader from "./pages/Volunteer/FileUploader";
import EventCard from "./pages/Volunteer/EventCard";
import EventDescription from "./pages/Volunteer/EventDescription";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import ZipDownloader from "./pages/Volunteer/ZipDownloader";
import CoreList from "./pages/Volunteer/CoreList";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        {/*admin side */}
        <Route path="/admin/core" element={<Core />} />
        <Route path="/admin/membership" element={<Memberships />} />
        <Route path="/admin/volunteers" element={<Volunteers />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/letters" element={<Letters />} />
        {/* volunteer side */}
        <Route path="/volunteer/add-core" element={<CoreList />} />
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
        <Route path="/volunteer/file-uploader" element={<FileUploader />} />
      </Routes>
    </>
  );
};

export default App;
