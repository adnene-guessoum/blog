import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [{ id }]);

  const createBlog = () => {
    return { __html: blog.content };
  };

  const capitalizeFirstLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  };

  return (
    <div className="container mt-3">
      <h1 className="display-2">{blog.title}</h1>
      <h2 className="text-muted mt-3">Catégorie: {capitalizeFirstLetter(blog.category)}</h2>
      <h4>
        Le {blog.day} {blog.month} {blog.year}
      </h4>
      <div className="mt-5 mb-5" dangerouslySetInnerHTML={createBlog()} />
      <hr />
      <p className="lead mb-5">
        <Link to="/blog" className="font-weight-bold">
          Retour aux articles
        </Link>
      </p>
    </div>
  );
};

export default BlogDetail;
