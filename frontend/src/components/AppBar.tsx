import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const AppBar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

    async function handleLogout() {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${BACKEND_URL}/api/v1/user/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                localStorage.removeItem("token");
                navigate("/signup");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    // Menu items used for both desktop and mobile
    const menuContent = (
        <>
            <motion.div whileHover={{ scale: 1.05 }} className="block rounded-md px-4 py-2 text-sm text-white hover:bg-indigo-700">
                <Link to="/about" className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-200 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    About Us
                </Link>
            </motion.div>
            <motion.button whileHover={{ scale: 1.05 }} onClick={handleLogout} className="w-full rounded-md text-left block px-4 py-2 text-sm text-white hover:bg-indigo-700">
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 text-indigo-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Sign out
                </div>
            </motion.button>
        </>
    );

    return (
        <>
            <motion.nav
                className="w-full bg-[#172130] text-white shadow-lg fixed top-0 z-50 backdrop-blur-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/blogs" className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-wide hover:text-indigo-300 transition duration-300">
                            BlogsBay
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex space-x-3 items-center">
                            <Link
                                to="/publish"
                                className="flex items-center bg-indigo-600 hover:bg-indigo-700 focus:outline focus:outline-indigo-400 px-5 py-2 rounded-xl shadow-md transition duration-300 font-semibold"
                            >
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <span className="pl-1">Create Blog</span>
                            </Link>
                            <div className="relative">
                                <motion.button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} whileTap={{ scale: 0.95 }} className="mt-1 focus:outline-none">
                                    <div className="relative w-10 h-10 overflow-hidden bg-[#2d466e] rounded-full">
                                        <svg className="absolute w-12 h-12 text-indigo-200/55 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </motion.button>
                                <AnimatePresence>
                                    {avatarMenuOpen && (
                                        <motion.div
                                            className="absolute right-1 mt-2 w-48 bg-[#1a273a] rounded-md shadow-lg py-1 z-10"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                        >
                                            {menuContent}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle (without Create Blog button) */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden flex flex-col space-y-1 focus:outline-none">
                            <div className="relative w-10 h-10 overflow-hidden bg-[#2d466e] rounded-full">
                                <svg className="absolute w-12 h-12 text-indigo-200/55 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className="sm:hidden absolute right-2 mt-2 w-44 bg-[#1a273a] rounded-md shadow-lg py-1 z-10"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            {menuContent}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Floating Action Button for Mobile: Only visible on small screens */}
            <motion.div
                className="fixed sm:hidden bottom-7 right-7 bg-indigo-500/50 hover:bg-indigo-500/60 text-white p-4 rounded-full shadow-lg z-[9999]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/publish">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </Link>
            </motion.div>
        </>
    );
};
