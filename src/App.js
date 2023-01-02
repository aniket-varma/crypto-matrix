import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {Navbar, Homepage, Converter, Cryptocurrencies, Cryptodetails, News} from "./components/index.js";
function App() {
  return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main flex-wrapper">
				<Layout>
					<div className="routes">
						<Routes>
							<Route exact path="/" element = {<Homepage/>}/>
								
							<Route exact path="/converter" element={<Converter/>}/>
							<Route exact path="/cryptocurrencies" element = {<Cryptocurrencies/>}/>
								
							<Route exact path="/crypto/:coinId" element={<Cryptodetails/>}/>
							<Route exact path="/news" element={<News/>}/>
						</Routes>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title  level={5} style={ { color : 'white', textAlign:'center'}}>
						Cryptoverse<br/>
						All rights reserved
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link><p>|</p>
						<Link to="/converter">Converter</Link><p>|</p>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
  );
}

export default App;
