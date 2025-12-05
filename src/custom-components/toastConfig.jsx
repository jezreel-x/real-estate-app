import { warning } from "framer-motion";

export const toastOptions = {
  success: {
    autoClose: 2000,
    style: {
      background: "#4caf50",
      color: "#fff",
    },
  },
  error: {
    autoClose: 3000,
    style: {
      background: "#f44336",
      color: "#fff",
    },
  },
  info: {
    autoClose: 2000,
    style: {
      background: "#2196F3",
      color: "#fff",
    },
  },
  warning: {
    autoClose: 3000,
    style: {
      background: "#ff9800",
      color: "#fff",
    },
    actions: [
      {
        label: 'Confirm',
        style: { color: '#fff', fontWeight: 'bold', paddingRight: '10px', marginTop: '5px' },
        onClick: () => {
          console.log('User confirmed the action.');
        },
      },
      {
        label: 'Cancel',
        style: { color: '#fff', fontWeight: 'bold', paddingRight: '10px', marginTop: '5px' },
        onClick: () => {
          console.log('User canceled the action.');
        },
      },
    ],
  },
};
