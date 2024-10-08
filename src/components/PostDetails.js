import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/posts/${id}`);
                const data = await response.json();
                setPost(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching post', error);
            }
        };

        fetchPost();
    }, []);

    return (
        <div className="container mt-5">
            <h2>{post.title}</h2>
            <p className="text-muted">{post.content}</p>
        </div>
    );
};

export default PostDetails;
