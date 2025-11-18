import { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("../../sign-ups/Login"));
const OTPDeliveryMethod = lazy(() => import("../../sign-ups/OTPDeliveryMethod"));
const OTPPage = lazy(() => import("../../sign-ups/OTPPage"));
const LandingPage = lazy(() => import("../../landing-page/LandingPage"));
const SignUp = lazy(() => import("../../sign-ups/SignUp"));
const ServiceProvider = lazy(() => import("../../roles/ServiceProvider"));
const Admin = lazy(() => import("../../roles/Admin"));
const Agent = lazy(() => import("../../roles/Agent"));
const ForgotPassword = lazy(() => import("../../sign-ups/ForgotPassword"));
const ResetPassword = lazy(() => import("../../sign-ups/ResetPassword"));

const signUpRoutes = [
    <Route path="/login" element={<Login />} key="login" />,
    <Route path="/otp-delivery-method" element={<OTPDeliveryMethod />} key="otp-delivery-method" />,
    <Route path="/otp-page" element={<OTPPage />} key="otp-page" />,
    <Route path="/" element={<LandingPage />} key="landing-page" />,
    <Route path="/sign-up" element={<SignUp />} key="sign-up" />,
    <Route path="/admin" element={<Admin />} key="admin" />,
    <Route path="/agent" element={<Agent />} key="agent" />,
    <Route path="/service-provider" element={<ServiceProvider />} key="service-provider" />,
    <Route path="/forgot-password" element={<ForgotPassword />} key="forgot-password" />,
    <Route path="/reset-password" element={<ResetPassword />} key="reset-password" />,
];


export default signUpRoutes;