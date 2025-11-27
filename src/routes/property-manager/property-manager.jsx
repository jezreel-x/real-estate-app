import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("../../property-manager/Dashboard"));
const User = lazy(() => import("../../property-manager/User"));

{/* Property Manager Routes */}
const propertyManagerRoutes = [
    <Route path="/property-manager/dashboard" element={<Dashboard />} key="property-manager-dashboard" />,
    <Route path="/property-manager/users" element={<User />} key="property-manager-users" />,
];

export default propertyManagerRoutes;