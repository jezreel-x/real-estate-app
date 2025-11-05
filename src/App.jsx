import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage.jsx';
import signUpRoutes from './routes/sign-ups/sign-ups.jsx';
import propertyInfoRoutes from './routes/property-info/property-info.jsx';
// import { BrowserRouter } from 'react-router-dom'
// import Hello from './landing-page/Hello.jsx'

function App() {

  return (
    <div>
      <ToastContainer
        position="top-center"
        reverseOrder={false}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          fontSize: "16px",
          borderRadius: "8px",
          padding: "16px",
        }}
      />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {signUpRoutes}
        {propertyInfoRoutes}
      </Routes>

    </div>
  )
}

export default App
