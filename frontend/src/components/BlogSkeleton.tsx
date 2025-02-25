export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="p-5 w-full max-w-4xl mx-auto cursor-pointer bg-[#1e293b] rounded-lg shadow-md">
                
                {/* Author Section */}
                <div className="flex items-center space-x-3">
                    {/* Profile Picture Placeholder */}
                    <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                    {/* Author Name and Additional Info Placeholder */}
                    <div className="flex flex-col space-y-1">
                        <div className="h-4 w-28 bg-gray-500 rounded-full"></div>
                        <div className="h-3 w-24 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
                
                {/* Blog Title Placeholder */}
                <div className="mt-4">
                    <div className="h-4 w-4/5 bg-gray-500 rounded-lg"></div>
                </div>

                {/* Blog Description Placeholder */}
                <div className="mt-2 space-y-2">
                    <div className="h-4 w-full bg-gray-500 rounded-lg"></div>
                    <div className="h-4 w-5/6 bg-gray-500 rounded-lg"></div>
                </div>

                {/* Date Placeholder */}
                <div className="mt-4">
                    <div className="h-4 w-20 bg-gray-500 rounded-lg"></div>
                </div>
            </div>
            {/* Screen Reader Text for Accessibility */}
            <span className="sr-only">Loading...</span>
        </div>
    );
};
