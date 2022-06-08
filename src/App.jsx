import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Usuarios from "./components/Usuarios";
import Usuario from "./components/Usuario";
import Summoners from "./components/Summoners";

import "./components/Styles.css";

function App() {
	return (
		<BrowserRouter>
			<Menu />
			<div className="container text-center py-3">
				<Routes>
					<Route exact path="/" element={<Usuarios />}></Route>
					<Route path="/champ/:id" element={<Usuario />}></Route>
					<Route path="/summoners" element={<Summoners />}></Route>
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
