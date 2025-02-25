export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-14 h-12 flex items-center justify-center animate-bounce">
        {/* Outer glow effect with rounded rectangle shape */}
        <div className="absolute inset-0 w-full h-full animate-ping rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-600 opacity-75"></div>
        
        {/* Inner logo container with rounded rectangle shape */}
        <div className="relative w-full h-full rounded-lg bg-[#1a377c] flex items-center justify-center shadow-xl">
          <svg width="100%" height="100%" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="none">
            <rect width="256" height="256" rx="48" fill="none" />
            <text x="41" y="153" fontFamily="Arial, sans-serif" fontSize="105" fontWeight="900" fill="#1482ff">W</text>
            <text x="144" y="153" fontFamily="Arial, sans-serif" fontSize="105" fontWeight="900" fill="#5180ff">F</text>
            <path d="M75 170 Q128 205 171 170" stroke="#5180ff" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="171" cy="170" r="10" fill="#1482ff" />
          </svg>
        </div>
      </div>
    </div>
  );
};