import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Index = ({ name, profile }) => {
	return (
		<>
			<div className="navbar-container">
				<div className="navbar-comp-name">
					<p>Edvora</p>
				</div>
				<div className="navbar-profile">
					<p>{name ? name : ""}</p>
					<img src={profile ? profile : ""} alt="profile_image" />
				</div>
			</div>
		</>
	);
};

export default Index;
