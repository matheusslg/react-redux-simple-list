import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/** Pages */
import Dashboard from "../pages/Dashboard";
import UserDetails from "../pages/UserDetails";

const RoutesComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/user-details/:userId" element={<UserDetails />} />
      <Route path="/user-details/new" exact element={<UserDetails isNewUser />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesComponent;
