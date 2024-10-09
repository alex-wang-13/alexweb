import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [plainDate, setPlainDate] = useState([]);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/posts/${id}`);
                const data = await response.json();
                const date = new Date(data.date).toUTCString().substring(0, 16);
                setPost(data);
                setPlainDate(date);
            } catch (error) {
                console.error('Error fetching post', error);
            }
        };

        fetchPost();
    }, []);

    return (
        <div className="container mt-5">
            <h2>{post.title}</h2>
            <p className="small">{post.author}</p>
            <p className="small">{plainDate}</p>
            <p className="text-muted">{post.content}</p>
        </div>
    );
};

export default PostDetails;
