import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // send to server
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Blog post submitted successfully');
        navigate('/');
      } else {
        console.error('Failed to submit blog post');
      }
    } catch (error) {
      console.error('Error submitting the blog post:', error);
    }
    // redirect to home
    // navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2>Submit a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
    </div>
  );
};

export default Posts;