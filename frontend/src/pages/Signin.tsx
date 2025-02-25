import { Auth2 } from "../components/Auth2";
import { Quote } from "../components/Quote";
import { motion } from "framer-motion";

export const Signin = () => {
    return (
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#121a2e] overflow-hidden">
            {/* Auth Section - Takes full width on mobile, shares space on larger screens */}
            <motion.div className="flex items-center justify-center bg-gradient-to-r from-[#181f2b] to-[#141d31] text-white p-6 md:p-10 lg:p-12 w-full">
                <Auth2 />
            </motion.div>
            {/* Quote Section - Visible only on large screens */}
            <motion.div className="hidden lg:flex items-center justify-center p-6">
                <Quote />
            </motion.div>
        </motion.div>
    );
};
