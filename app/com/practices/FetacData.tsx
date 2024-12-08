import React from 'react'

interface Post {
    id: number
    title: string
    content: string
    author: string,
    date: string
    category: string
}

export default async function FetacData() {
    try {
        const response = await fetch('https://api.vercel.app/blog');
        const posts: Post[] = await response.json();

        return (
            <div>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </div>
        );
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
