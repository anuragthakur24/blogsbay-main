import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";
import { useState } from "react";

export const AppBar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Handle user logout
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

    return (
        <motion.nav 
            className="w-full bg-[#172130] text-white shadow-lg fixed top-0 z-50 backdrop-blur-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link to="/blogs" className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-wide hover:text-indigo-300 transition duration-300">
                        WordFlow
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex space-x-4 items-center">
                        {/* Create Blog Button */}
                        <Link to="/publish" className="flex items-center bg-indigo-600 hover:bg-indigo-700 focus:outline focus:outline-indigo-400 px-5 py-2 rounded-xl shadow-md transition duration-300 font-semibold">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <div className="pl-1">Create Blog</div>
                        </Link>

                        {/* Logout Button */}
                        <button onClick={handleLogout} className="flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline focus:outline-indigo-400 px-5 py-2 rounded-xl shadow-md transition duration-300 font-semibold">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                            <div className="pl-1">Logout</div>
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden flex flex-col space-y-1 focus:outline-none">
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden bg-[#1e293b] py-3 flex flex-col items-center space-y-4 shadow-md">
                    <Link to="/publish" className="flex items-center w-full justify-center py-2 hover:bg-indigo-700 transition duration-300">
                        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <div className="pl-1">Create Blog</div>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full justify-center py-2 hover:bg-indigo-600 transition duration-300">
                        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        <div className="pl-1">Logout</div>
                    </button>
                </div>
            )}
        </motion.nav>
    );
};
