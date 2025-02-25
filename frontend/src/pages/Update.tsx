import { useParams } from "react-router-dom";
import { useBlog } from "../Hooks";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AppBar } from "../components/AppBar";
import { Edit } from "./Edit";

export const Update = () => {
    const { id } = useParams(); // Get blog ID from URL params
    const { loading, blog } = useBlog({ id: id || "" }); // Fetch blog data

    // Show loading spinner while fetching data
    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="min-h-screen bg-[#0f172a] text-gray-200 flex flex-col">
                    <div className="flex flex-grow justify-center items-center">
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        );
    }

    // Show message if blog is not found
    if (!blog) {
        return <div>Blog not found</div>;
    }

    // Render the Edit component with blog data
    return (
        <div>
            <Edit blog={blog} />
        </div>
    );
};
