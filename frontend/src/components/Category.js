import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentCat, setCurrentCat] = useState('');
  const { id } = useParams();
	const REACT_APP_API_URL = "http://owlingblog-env.eba-iv2cgmyy.eu-west-3.elasticbeanstalk.com"

  useEffect(() => {
    const category = id;
    setCurrentCat(capitalizeFirstLetter(category));

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${REACT_APP_API_URL}/api/blog/category`,
          { category },
          config
        );
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [{ id }]);

  const capitalizeFirstLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return '';
  };

  const getCategoryBlogs = () => {
    let list = [];
    let result = [];

    blogs.map((blogPost) => {
      return list.push(
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-success">
              {capitalizeFirstLetter(blogPost.category)}
            </strong>
            <h3 className="mb-0">{blogPost.title}</h3>
            <div className="mb-1 text-muted">
              {blogPost.month} {blogPost.day}
            </div>
            <p className="mb-auto">{blogPost.excerpt}</p>
            <Link to={`/blog/${blogPost.slug}`} className="stretched-link">
              Lire la suite...
            </Link>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img width="200" height="250" src={blogPost.thumbnail} alt="thumbnail publication" />
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{list[i]}</div>
          <div className="col-md-6">{list[i + 1] ? list[i + 1] : null}</div>
        </div>
      );
    }
    return result;
  };

  return (
    <div className="container mt-3">
      <h3 className="display-4">{currentCat}</h3>

      <div className="container mt-3">
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            <Link className="p-2 link-secondary" to="/category/technologie">
              Tech
            </Link>
            <Link className="p-2 link-secondary" to="/category/société">
              Société
            </Link>
            <Link className="p-2 link-secondary" to="/category/lectures">
              Lectures
            </Link>
            <Link className="p-2 link-secondary" to="/category/opinion">
              Opinions
            </Link>
            <Link className="p-2 link-secondary" to="/category/divers(tissement)">
              Divers(tissement)
            </Link>
          </nav>
        </div>
      </div>

      {getCategoryBlogs()}
    </div>
  );
};

export default Category;
