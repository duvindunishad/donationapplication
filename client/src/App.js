import {Routes, Route} from "react-router-dom";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import { Toast } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/layout/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>

      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="" element={<Dashboard></Dashboard>} />
      </Route>
     
      
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
      
      <Route path="/login" element={<Login></Login>}></Route>
      
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/policy" element={<Policy></Policy>}></Route>
      <Route path="*" element={<Pagenotfound></Pagenotfound>}></Route>
    </Routes>
    </>
  );
}

export default App;
