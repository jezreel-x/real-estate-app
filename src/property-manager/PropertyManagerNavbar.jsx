import { BellRing } from "lucide-react";

const PropertyManagerNavbar = () => {

    const menuOptions = [
        {
            icon: <BellRing className="w-5 h-5 text-amber-500" />, 
            items: [
                "A new tenant has signed up", 
                "Invoice #1234 has been paid",
                "Maintenance request #5678 has been created",
                "New inquiry from John Doe"
            ]
        },
        {
            icon: "profile", items: [""]
        },
    ];

    return (
        <>
        </>
    );
};

export default PropertyManagerNavbar;