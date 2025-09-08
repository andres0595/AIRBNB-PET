import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TabServices from "./TabsServices";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import Faq from "./Faq";
import Blog from "./Blog";
function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TabServices />
        <Services />
        <HowItWorks />
        <Faq />
        <Blog />
      </motion.div>
    </div>
  );
}

export default Dashboard;
