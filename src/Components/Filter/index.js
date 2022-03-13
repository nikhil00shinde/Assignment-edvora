import React, { useEffect, useState } from "react";
import "./Filter.css";

function Index({ filterOpen, rides, setState, setCity, state, city }) {
	const [stateArr, setStateArr] = useState([]);
	const [cityArr, setCityArr] = useState([]);

	useEffect(() => {
		const myState = new Set();
		const myCity = new Set();

		if (rides) {
			rides.map((ride) => myState.add(ride.state));
			setStateArr([...myState]);

			rides.map((ride) => myCity.add(ride.city));
			setCityArr([...myCity]);
		}
	}, [rides]);

	const handleChange1 = (e) => {
		let value = e.target.value;
		console.log(value);
		setState(value);
	};

	const handleChange2 = (e) => {
		let value = e.target.value;
		setCity(value);
	};

	return (
		<>
			{filterOpen && (
				<div className="filter-container">
					<div className="filter-name">Filters</div>
					<hr />
					<div className="filter-state-dropdown">
						<select name="State" value={state} onChange={handleChange1}>
							<option value={state}>{state}</option>
							{stateArr.map((state) => (
								<option value={state}>{state}</option>
							))}
						</select>
					</div>
					<div className="filter-city-dropdown">
						<select name="City" value={city} onChange={handleChange2}>
							<option value={city}>{city}</option>
							{cityArr.map((city) => (
								<option value={city}>{city}</option>
							))}
						</select>
					</div>
				</div>
			)}
		</>
	);
}

export default Index;
