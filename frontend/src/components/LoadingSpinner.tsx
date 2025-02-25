export const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-12 h-12 flex items-center justify-center animate-bounce">
                {/* Outer glow effect */}
                <div className="absolute inset-0 w-full h-full animate-ping rounded-full bg-gradient-to-r from-indigo-700 to-indigo-600 opacity-75"></div>
                
                {/* Inner logo container */}
                <div className="relative w-full h-full rounded-full bg-[#1b45a5] flex items-center justify-center shadow-xl">
                    <svg width="100%" height="100%" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <defs>
                            <linearGradient id="circleGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#092a78" />
                                <stop offset="100%" stopColor="#1b45a5" />
                            </linearGradient>
                        </defs>
                        <circle cx="128" cy="128" r="120" fill="url(#circleGradient)" />
                        <text x="55" y="153" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="900" fill="#1482ff">W</text>
                        <text x="143" y="153" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="900" fill="#5180ff">F</text>
                        <path d="M85 170 Q128 205 171 170" stroke="#5180ff" strokeWidth="6" strokeLinecap="round" fill="none" />
                        <circle cx="171" cy="170" r="8" fill="#1482ff" />
                    </svg>
                </div>
            </div>
        </div>
    );
};