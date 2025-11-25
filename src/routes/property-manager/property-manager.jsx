import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("../../property-manager/Dashboard"));


const propertyManagerRoutes = [
    <Route path="/property-manager/dashboard" element={<Dashboard />} key="property-manager-dashboard" />,
];

export default propertyManagerRoutes;