import { motion } from "framer-motion";

export const Quote = () => {
    return (
        <motion.div 
            className="text-center max-w-lg" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }} // Smooth hover effect
        >
            {/* Main quote text */}
            <blockquote className="text-3xl font-semibold leading-relaxed text-gray-100">
                "Dream, create, inspire - your words have the power to change the world."
            </blockquote>
            
            {/* Author attribution */}
            <div className="mt-4 text-lg font-bold text-indigo-400">Anonymous</div>
            <div className="text-gray-400 text-sm">Blogger & Thinker</div>
        </motion.div>
    );
};
