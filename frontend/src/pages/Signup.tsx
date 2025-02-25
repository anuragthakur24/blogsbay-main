import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { motion } from "framer-motion";

export const Signup = () => {
    return (
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#121a2e] overflow-hidden">
            {/* Quote section - only visible on large screens */}
            <motion.div className="hidden lg:flex items-center justify-center">
                <Quote />
            </motion.div>
            {/* Authentication section with gradient background */}
            <motion.div className="flex items-center justify-center bg-gradient-to-r from-[#141d31] to-[#181f2b] text-white p-6 md:p-10 lg:p-12 w-full">
                <Auth />
            </motion.div>
        </motion.div>
    );
};
