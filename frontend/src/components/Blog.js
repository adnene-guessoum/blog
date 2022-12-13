import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
	const [blogs, setBlogs] = useState([]);
	const [featuredBlog, setFeaturedBlog] = useState([]);

	// API request avec async-await

	useEffect(() => {
		const fetchFeatured = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/featured`);
				setFeaturedBlog(response.data[0]);
			}
			catch (err) {

			}
		}

		fetchFeatured();
	}, []);


	useEffect(() => {
			const fetchBlogs = async () => {
				try {
					const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
					setBlogs(res.data);
				}
				catch (err) {

				}
			}

			fetchBlogs();
		}, []);


	// capitalize categories
	const capitalizeFirstLetter = (word) => {
		if (word)
			return word.charAt(0).toUpperCase() + word.slice(1);
		return '';
	};

	const getBlogs = () => {
		let list = [];
		let result = [];

		blogs.map(blogPost => {
			return list.push(
				<div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
				<div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-success">
				{capitalizeFirstLetter(blogPost.category)}
				</strong>
          <h3 className="mb-0">{blogPost.title}</h3>
          <div className="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
          <p className="mb-auto">{blogPost.excerpt}</p>
          <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Lire la suite...</Link>
				</div>
				<div class="col-auto d-none d-lg-block">
				<img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail publication' />
				</div>
				</div>
			);
		});

		for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
		return result;
	};

	return (
		<div className='container mt-3'>
			<div className="nav-scroller py-1 mb-2">
				<nav className="nav d-flex justify-content-between">
					<Link className="p-2 link-secondary" to='/category/technologie'>Tech</Link>
					<Link className="p-2 link-secondary" to='/category/société'>Société</Link>
					<Link className="p-2 link-secondary" to='/category/lectures'>Lectures</Link>
					<Link className="p-2 link-secondary" to='/category/opinion'>Opinions</Link>
					<Link className="p-2 link-secondary" to='/category/divers(tissement)'>Divers(tissement)</Link>
				</nav>
		</div>

		<div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
		<div className="col-md-6 px-0">
		<h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
		<p className="lead my-3">{featuredBlog.excerpt}</p>
		<p className="lead mb-0"><Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold">Lire la suite ...</Link></p>
		</div>
		</div>

		{getBlogs()}
		</div>
	);

};

export default Blog;

