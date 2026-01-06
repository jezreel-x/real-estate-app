import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("../../property-manager/Dashboard"));
const Tenant = lazy(() => import("../../property-manager/Tenant"));
const Invoice = lazy(() => import("../../property-manager/Invoice"));
const Property = lazy(() => import("../../property-manager/Property"));
const Inquiries = lazy(() => import("../../property-manager/Inquiries"));

{/* Property Manager Routes */}
const propertyManagerRoutes = [
    <Route path="/property-manager/dashboard" element={<Dashboard />} key="property-manager-dashboard" />,
    <Route path="/property-manager/tenants" element={<Tenant />} key="property-manager-tenants" />,
    <Route path="/property-manager/invoices" element={<Invoice />} key="property-manager-invoices" />,
    <Route path="/property-manager/properties" element={<Property />} key="property-manager-properties" />,
    <Route path="/property-manager/inquiries" element={<Inquiries />} key="property-manager-inquiries" />,
];

export default propertyManagerRoutes;