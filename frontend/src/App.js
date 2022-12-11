import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail'
import Category from './components/Category'

const App = () => (
	<Router>
		<Layout>
			<Routes>
				<Route exact path='/' element={<Home/>} />
				<Route exact path='/blog' element={<Blog/>} />
				<Route exact path='/category/:id' element={<Category/>} />
				<Route exact path='/blog/:id' element={<BlogDetail/>} />
			</Routes>
		</Layout>
	</Router>
);

export default App;
