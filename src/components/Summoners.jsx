import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Styles.css";

function Summoners() {
	const [summoners, setSummoners] = useState([]);
	const [version, setVersion] = useState([]);

	const obtenerSummoners = async () => {
		const resVersion = await axios.get("//ddragon.leagueoflegends.com/api/versions.json");
		const version = await resVersion.data;
		setVersion(version);
		const res = await axios.get(`//ddragon.leagueoflegends.com/cdn/${version[0]}/data/es_MX/summoner.json`);
		const summoners = await res.data;
		const summonersList = Object.values(summoners.data);
		setSummoners(summonersList);
	};

	useEffect(() => {
		obtenerSummoners();
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h2>Summoners</h2>
					</div>
					<hr />
				</div>

				{summoners.map((item, i) => (
					<div className="row justify-content-center item-summoners">
						<div key={i} className="col-12 col-lg-8 my-4">
							<img loading="lazy" src={`//ddragon.leagueoflegends.com/cdn/${version[0]}/img/spell/${item.id}.png`} alt="" />
							<h4 className="my-2">{item.name}</h4>
							<p dangerouslySetInnerHTML={{ __html: item.description }}></p>
							<p>
								Disponible en modos:{" "}
								<strong>
									{item.modes.map((modes, i) => (
										<span key={i} className="spanModes" dangerouslySetInnerHTML={{ __html: i === 0 ? " " + modes : ", " + modes }}></span>
									))}
									.
								</strong>
							</p>
						</div>
						<hr />
					</div>
				))}
			</div>
		</Fragment>
	);
}

export default Summoners;
