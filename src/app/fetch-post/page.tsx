"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FetchPostsPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch((err) => setError("An unexpected error occurred"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 rounded-lg shadow-md">
            <div className="flex justify-between">
                <Link href="tel:03152873123">
                <h2 className="text-xl cursor-pointer transition hover:text-green-400">Saddam khan</h2> 
                </Link>
                <h2 className="text-xl">Giaic : Student</h2>
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>  
            

            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <ul className="space-y-4">
                    {posts.map((post: { id: number; title: string; body: string }) => (
                        <li
                            key={post.id}
                            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <span className="text-sm font-bold text-gray-500 mb-2 block">
                                ID: {post.id}
                            </span>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-600">{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
