import React, { useEffect, useState } from "react";
import "./Cab.css";
import CabInfo from "../CabInfo";
import Filter from "../Filter";
const axios = require("axios");

const styles = {
	visible: {
		textDecoration: "underline",
		textUnderlineOffset: "3px",
		textDecorationThickness: "3px",
	},
	hidden: {
		textDecoration: "none",
		color: "#A8A8A8",
	},
};

function Index({ stCode }) {
	const [cab, setCab] = useState([]);

	const [rides, setRides] = useState("");
	const [selected, setSelected] = useState(1);
	const [upLength, setUpLength] = useState(cab?.length);
	const [pastLength, setPastLength] = useState(cab?.length);
	const [filterOpen, setFilterOpen] = useState(false);
	useEffect(() => {
		axios
			.get("https://assessment.api.vweb.app/rides")
			.then(function (response) {
				console.log(response.data);
				setRides(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				alert(error.message);
			});
	}, []);
	const [state, setState] = useState("State");
	const [city, setCity] = useState("City");

	useEffect(() => {
		if (rides) {
			let arr = rides.filter((ride) => ride.state === state);
			setCab([...arr]);
		}
	}, [state]);

	useEffect(() => {
		if (rides) {
			let arr = rides.filter((ride) => ride.city === city);
			setCab([...arr]);
		}
	}, [city]);

	const handleClick = (num) => {
		setSelected(num);
	};
	const handleFilter = (e) => {
		setFilterOpen(!filterOpen);
	};
	return (
		<>
			<div className="cab-section">
				<div className="cab-option-section">
					<div className="cab-option">
						<p
							className="nearest-ride"
							onClick={() => handleClick(1)}
							style={selected === 1 ? styles.visible : styles.hidden}
						>
							Nearest rides
						</p>
						<p
							className="upcoming-ride"
							onClick={() => handleClick(2)}
							style={selected === 2 ? styles.visible : styles.hidden}
						>
							Upcomming rides ({upLength})
						</p>
						<p
							onClick={() => handleClick(3)}
							style={selected === 3 ? styles.visible : styles.hidden}
						>
							Past rides ({pastLength})
						</p>
					</div>
					<div className="cab-filter" onClick={handleFilter}>
						<img
							src="https://img.icons8.com/ios-filled/50/000000/sorting-answers.png"
							alt="icon"
						/>
						Filters
					</div>
				</div>
				<CabInfo
					rides={rides}
					stCode={stCode}
					selected={selected}
					setUpLength={setUpLength}
					setPastLength={setPastLength}
					setRides={setRides}
					cab={cab}
					setCab={setCab}
				/>
			</div>
			<Filter
				filterOpen={filterOpen}
				rides={rides}
				setState={setState}
				setCity={setCity}
				state={state}
				city={city}
			/>
		</>
	);
}

export default Index;
