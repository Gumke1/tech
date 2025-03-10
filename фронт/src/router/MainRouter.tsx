import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmpPage from "../components/pages/General/FilmpPage";
import GeneralPage from "../components/pages/General/GeneralPage";
import SearcherPage from "../components/pages/General/SearcherPage";
import LoginPage from "../components/pages/Login/LoginPage";
import RegistrationPage from "../components/pages/Registration/RegistrationPage";

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<GeneralPage/>} />
				<Route path="/login" element={<LoginPage/>} />
				<Route path="/registration" element={<RegistrationPage/>} />
				<Route path="/moviesearch" element={<SearcherPage/>} />
				{/*  Изменили маршрут на /movie/:id */}
				<Route path="/movie/:id" element={<FilmpPage/>} />
			</Routes>
		</BrowserRouter>
	);
};

export default MainRouter;