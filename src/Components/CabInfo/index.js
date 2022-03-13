import React, { useEffect, useState } from "react";
import "./CabInfo.css";
import dateFormat, { masks } from "dateformat";
const now = new Date();

function Index({
	rides,
	stCode,
	selected,
	setUpLength,
	setPastLength,
	setRides,
	cab,
	setCab,
}) {
	useEffect(() => {
		if (rides && stCode) {
			let newArr = rides.map((ride) => {
				const isLargeNumber = (element) => element >= stCode;
				let index = ride?.station_path.findIndex(isLargeNumber);

				if (index === -1) index = 0;

				ride.distance = ride?.station_path[index] - stCode;

				return ride;
			});
			newArr.sort((a, b) => Number(a.distance) - Number(b.distance));
			setRides([...newArr]);
		}
	}, [stCode]);

	useEffect(() => {
		if (rides) {
			let arr1 = rides.filter((ride) => {
				return new Date(ride?.date) > new Date();
			});
			let arr2 = rides.filter((ride) => {
				return new Date(ride?.date) < new Date();
			});
			let arr3 = rides;
			if (selected === 2) {
				setCab([...arr1]);
			} else if (selected === 3) {
				setCab([...arr2]);
			} else {
				setCab([...arr3]);
			}
			setUpLength(arr1.length);
			setPastLength(arr2.length);
		}
	}, [selected, rides]);

	return (
		<>
			<div className="container">
				{cab &&
					cab.map((ride, idx) => (
						<div key={idx} className="cab-info-container">
							<div className="cab-info-img">
								<img src={ride?.map_url} alt="ima" />
							</div>
							<div className="cab-info">
								<div className="cab-info-option">
									<p>
										Ride id :&nbsp;
										<span style={{ color: "white" }}>{ride?.id}</span>
									</p>
									<p>
										Origin Station :&nbsp;
										<span style={{ color: "white" }}>
											{}
											{ride?.origin_station_code}
										</span>
									</p>
									<p>
										station_path :&nbsp;
										<span style={{ color: "white" }}>{"["}</span>
										{ride?.station_path.map((e, i) => {
											return (
												<span key={i} style={{ color: "white" }}>
													{e}
													{i < ride?.station_path.length - 1 ? ", " : ""}
												</span>
											);
										})}
										<span style={{ color: "white" }}>{"]"}</span>
									</p>
									<p>
										Date:&nbsp;
										<span style={{ color: "white" }}>
											{dateFormat(ride?.date)}
										</span>
									</p>
									<p>
										Distance :&nbsp;
										<span style={{ color: "white" }}>{ride?.distance}</span>
									</p>
								</div>
								<div className="cab-info-name">
									<p>{ride?.city}</p>
									<p>{ride?.state}</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
}

export default Index;
