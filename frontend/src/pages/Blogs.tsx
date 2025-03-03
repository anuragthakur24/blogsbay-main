import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks";
import { Blog } from "../Hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    // Show skeleton loaders while blogs are loading
    if (loading) {
        return (
            <div className="bg-[#0f172a] min-h-screen text-gray-200">
                <AppBar />
                <div className="flex justify-center pt-20 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8 bg-[#15203a] rounded-2xl">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    // Sort blogs by published date (or created date if missing)
    const sortedBlogs = [...blogs].sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.createdAt);
        const dateB = new Date(b.publishedDate || b.createdAt);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="bg-[#0f172a] min-h-screen text-gray-200">
            <AppBar />
            <div className="flex justify-center pt-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8 bg-[#15203a] rounded-2xl">
                    {sortedBlogs.map((blog: Blog) => {
                        // Format published date or fallback to 'Unknown Date'
                        const publishedDate = blog.publishedDate
                            ? new Date(blog.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                            : (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Unknown Date");

                        return (
                            <div key={blog.id} className="hover:shadow-xl rounded-lg transition-transform duration-300">
                                <BlogCard
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={publishedDate}
                                    likeCount={blog.likeCount}
                                    dislikeCount={blog.dislikeCount}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-center items-center space-x-2 text-xs text-gray-300 py-6 opacity-80">
                <div className="pointer-events-none">
                    <span>Created by Anurag Thakur on Jan 14, 2025</span>
                </div>
                <Link to="/about">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-200 transition duration-300 hover:scale-110 hover:text-indigo-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};
