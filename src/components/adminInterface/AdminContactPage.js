// src/components/adminInterface/AdminContactPage.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactList from "../adminContactComponents/ContactList";
import ContactPost from "../adminContactComponents/ContactPost";
import RequireAdmin from "./RequireAdmin";

const AdminContactPage = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <RequireAdmin>
            <ContactList />
          </RequireAdmin>
        }
      />
      <Route
        path=":id"
        element={
          <RequireAdmin>
            <ContactPost />
          </RequireAdmin>
        }
      />
    </Routes>
  );
};

export default AdminContactPage;
