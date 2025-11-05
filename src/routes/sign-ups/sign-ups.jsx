import { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("../../sign-ups/Login"));
const SignUp = lazy(() => import("../../sign-ups/SignUp"));
const ServiceProvider = lazy(() => import("../../roles/ServiceProvider"));
const Admin = lazy(() => import("../../roles/Admin"));
const Agent = lazy(() => import("../../roles/Agent"));
const ForgotPassword = lazy(() => import("../../sign-ups/ForgotPassword"));
const ResetPassword = lazy(() => import("../../sign-ups/ResetPassword"));

const signUpRoutes = [
    <Route path="/login" element={<Login />} key="login" />,
    <Route path="/sign-up" element={<SignUp />} key="sign-up" />,
    <Route path="/admin" element={<Admin />} key="admin" />,
    <Route path="/agent" element={<Agent />} key="agent" />,
    <Route path="/service-provider" element={<ServiceProvider />} key="service-provider" />,
    <Route path="/forgot-password" element={<ForgotPassword />} key="forgot-password" />,
    <Route path="/reset-password" element={<ResetPassword />} key="reset-password" />,
];


export default signUpRoutes;