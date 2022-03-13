import Navbar from "./Components/Navbar";
import Cab from "./Components/Cab";
import "./App.css";
import React, { useEffect, useState } from "react";


const axios = require("axios");

const App = () => {
	const [name, setName] = useState("");
	const [stCode, setStCode] = useState("");
	const [profile, setProfile] = useState("");

	useEffect(() => {
		axios
			.get("https://assessment.api.vweb.app/user")
			.then(function (response) {
				let data = response.data;
				setName(data?.name);
				setProfile(data?.url);
				setStCode(data?.station_code);
			})
			.catch(function (error) {
				alert(error.message);
			});
	}, []);
	return (
		<>
			<Navbar name={name} profile={profile} />
			<Cab stCode={stCode} />
			
		</>
	);
};

export default App;
