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
					const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
					setBlogs(response.data);
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
		
	};

	return (

		<div className='container mt-3'>
			<div className="nav-scroller py-1 mb-2">
				<nav className="nav d-flex justify-content-between">
					<Link className="p-2 link-secondary" to='/category/TECH'>Tech</Link>
					<Link className="p-2 link-secondary" to='/category/SOCIETY'>Société</Link>
					<Link className="p-2 link-secondary" to='/category/LECT'>Lectures</Link>
					<Link className="p-2 link-secondary" to='/category/OPINION'>Opinions</Link>
					<Link className="p-2 link-secondary" to='/category/ENTERTAINMENT'>Divers(tissement)</Link>
				</nav>
		</div>

		<div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
		<div className="col-md-6 px-0">
		<h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
		<p className="lead my-3">{featuredBlog.excerpt}</p>
		<p className="lead mb-0"><Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold">Lire la suite ...</Link></p>
		</div>
		</div>

		</div>
	);

};

export default Blog;

