import { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("../../tenant/sign-ups/Login"));
const OTPDeliveryMethod = lazy(() => import("../../tenant/sign-ups/OTPDeliveryMethod"));
const OTPPage = lazy(() => import("../../tenant/sign-ups/OTPPage"));
const LandingPage = lazy(() => import("../../tenant/landing-page/LandingPage"));
const SignUp = lazy(() => import("../../tenant/sign-ups/SignUp"));
const ServiceProvider = lazy(() => import("../../roles/ServiceProvider"));
const PropertyManager = lazy(() => import("../../roles/PropertyManager"));
const Agent = lazy(() => import("../../roles/Agent"));
const ForgotPassword = lazy(() => import("../../tenant/sign-ups/ForgotPassword"));
const ResetPassword = lazy(() => import("../../tenant/sign-ups/ResetPassword"));

const signUpRoutes = [
    <Route path="/login" element={<Login />} key="login" />,
    <Route path="/otp-delivery-method" element={<OTPDeliveryMethod />} key="otp-delivery-method" />,
    <Route path="/otp-page" element={<OTPPage />} key="otp-page" />,
    <Route path="/" element={<LandingPage />} key="landing-page" />,
    <Route path="/sign-up" element={<SignUp />} key="sign-up" />,
    <Route path="/property-manager" element={<PropertyManager />} key="property-manager" />,
    <Route path="/agent" element={<Agent />} key="agent" />,
    <Route path="/service-provider" element={<ServiceProvider />} key="service-provider" />,
    <Route path="/forgot-password" element={<ForgotPassword />} key="forgot-password" />,
    <Route path="/reset-password" element={<ResetPassword />} key="reset-password" />,
];


export default signUpRoutes;