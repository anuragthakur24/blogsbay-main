export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-14 h-14 flex items-center justify-center animate-bounce">
        {/* Outer glow effect with rounded rectangle shape */}
        <div className="absolute inset-0 w-full h-full animate-ping rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-600 opacity-75"></div>
        
        {/* Inner logo container with rounded rectangle shape */}
        <div className="relative w-full h-full rounded-lg bg-[#1a377c] flex items-center justify-center shadow-xl">
          <svg width="100%" height="100%" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="none">
            <rect width="256" height="256" rx="48" fill="none" />
            <text x="50" y="153" fontFamily="Arial, sans-serif" fontSize="105" fontWeight="900" fill="#1482ff">B</text>
            <text x="127" y="153" fontFamily="Arial, sans-serif" fontSize="105" fontWeight="900" fill="#5180ff">B</text>
            <path d="M70 170 Q128 205 190 170" stroke="#5180ff" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="190" cy="170" r="8" fill="#1482ff" />
          </svg>
        </div>
      </div>
    </div>
  );
};