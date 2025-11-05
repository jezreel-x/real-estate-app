import { lazy } from "react";
import { Route } from "react-router-dom";

const HouseForSaleDetails = lazy(() => import("../../property-details/HouseForSaleDetails"));
const ApartmentForSaleDetails = lazy(() => import("../../property-details/ApartmentForSaleDetails"));
const HouseForRentDetails = lazy(() => import("../../property-details/HouseForRentDetails"));
const ApartmentForRentDetails = lazy(() => import("../../property-details/ApartmentForRentDetails"));

const propertyInfoRoutes = [
    <Route path="/houses-for-sale/details" element={<HouseForSaleDetails />} key="property-info" />,
    <Route path="/apartments-for-sale/details" element={<ApartmentForSaleDetails />} key="apartment-info" />,
    <Route path="/houses-for-rent/details" element={<HouseForRentDetails />} key="rent-property-info" />,
    <Route path="/apartments-for-rent/details" element={<ApartmentForRentDetails />} key="rent-apartment-info" />,
];

export default propertyInfoRoutes;