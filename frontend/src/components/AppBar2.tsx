import { useNavigate, useLocation } from "react-router-dom";

export const AppBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the current page is the About page
    const isAboutPage = location.pathname === "/about";

    return (
        <nav className="w-full bg-[#172130] text-white shadow-lg fixed top-0 z-50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-16">

                    {/* Show back button only on the About page */}
                    {isAboutPage && (
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white text-lg font-semibold flex items-center space-x-2 transition duration-300 hover:text-indigo-400"
                        >
                            {/* Back arrow icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                            <span>Back</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
