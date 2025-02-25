import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Interface for a Blog object
export interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    publishedDate: string;
    author: { name: string };
    likeCount: number;
    dislikeCount: number;
    [key: string]: any; // Allow additional properties
}

// Hook to fetch a single blog by ID
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
            setBlog(res.data.blog);
            setLoading(false);
        });
    }, [id]);

    return { loading, blog };
};

// Hook to fetch multiple blogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: { Authorization: localStorage.getItem("token") || "" }
        }).then(res => {
            const blogsWithCounts = res.data.blogs.map((blog: Blog) => ({
                ...blog,
                likeCount: blog._count.likes, // Extract like count
                dislikeCount: blog._count.dislikes // Extract dislike count
            }));
            setBlogs(blogsWithCounts);
            setLoading(false);
        }).catch(err => {
            console.error('Error fetching blogs:', err);
        });
    }, []);

    return { loading, blogs };
};

// Hook to fetch formatted publication dates for blogs
export const useDate = () => {
    const [dates, setDates] = useState<Record<string, string>>({});
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: { Authorization: localStorage.getItem("token") || "" }
        }).then(({ data }) => {
            const blogs = data.blogs as Blog[];
            const dateMap = blogs.reduce((acc, blog) => {
                const date = blog.publishedDate || blog.createdAt;
                acc[blog.id] = date ? new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }) : "Unknown Date";
                return acc;
            }, {} as Record<string, string>);
            setDates(dateMap);
        }).catch((error) => {
            console.error("Error fetching dates:", error);
        });
    }, []);
    
    return { dates };
}; 

// Hook to handle like/dislike functionality
export function useLikeDislike(blogId: string) {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isProcessingLike, setIsProcessingLike] = useState(false);
    const [isProcessingDislike, setIsProcessingDislike] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch like/dislike status on mount
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers: { Authorization: localStorage.getItem("token") || "" }
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsLiked(data.isLiked);
                    setIsDisliked(data.isDisliked);
                }
            } catch (error) {
                console.error("Error fetching like status:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStatus();
    }, [blogId]);

    // Handle like toggle
    const toggleLike = async () => {
        if (isProcessingLike || isProcessingDislike) return;
        setIsProcessingLike(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/blog/like/${blogId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("token") || "" }
            });
            if (response.ok) {
                setIsLiked(prev => !prev);
                setIsDisliked(false);
            }
        } catch (error) {
            console.error("Error liking blog:", error);
        } finally {
            setIsProcessingLike(false);
        }
    };

    // Handle dislike toggle
    const toggleDislike = async () => {
        if (isProcessingLike || isProcessingDislike) return;
        setIsProcessingDislike(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/blog/dislike/${blogId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("token") || "" }
            });
            if (response.ok) {
                setIsDisliked(prev => !prev);
                setIsLiked(false);
            }
        } catch (error) {
            console.error("Error disliking blog:", error);
        } finally {
            setIsProcessingDislike(false);
        }
    };

    return { isLiked, isDisliked, toggleLike, toggleDislike, isLoading, isProcessingLike, isProcessingDislike };
}
