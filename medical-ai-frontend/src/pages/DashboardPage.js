import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Overview from "../components/Dashboard/Overview";
import Diagnosis from "../components/Dashboard/Diagnosis";
import Results from "../components/Dashboard/Results";

const DashboardPage = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/results" element={<Results />} />
        <Route
          path="/analytics"
          element={<div className="p-8">Analytics Page - Coming Soon</div>}
        />
        <Route
          path="/settings"
          element={<div className="p-8">Settings Page - Coming Soon</div>}
        />
      </Routes>
    </Layout>
  );
};

export default DashboardPage;
