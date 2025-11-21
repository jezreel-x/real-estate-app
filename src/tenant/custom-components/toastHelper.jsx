import { toast } from "react-toastify"; 
import { toastOptions } from "./toastConfig.jsx";

export const notify = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message, toastOptions.success);
            break;
        case 'error':
            toast.error(message, toastOptions.error);
            break;
        case 'info':
            toast.info(message, toastOptions.info);
            break;
        default:
            toast(message);
    }
};