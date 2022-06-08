import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import "./Styles.css";

function Usuarios() {
	const [usuarios, setUsuarios] = useState([]);
	const [version, setVersion] = useState([]);

	const obtenerUsuarios = async () => {
		const resVersion = await axios.get("//ddragon.leagueoflegends.com/api/versions.json");
		const version = await resVersion.data;
		setVersion(version);
		const res = await axios.get(`//ddragon.leagueoflegends.com/cdn/${version[0]}/data/es_MX/champion.json`);
		const champs = await res.data;
		const champsList = Object.values(champs.data);
		setUsuarios(champsList);
	};

	useEffect(() => {
		obtenerUsuarios();
	}, []);

	return (
		<Fragment>
			<Buscador />

			<h2 className="text-center">Lista de Campeones</h2>
			<h6 style={{ textTransform: "uppercase" }}>Version: {version[0]}</h6>
			<div className="row justify-content-center">
				{usuarios.map((item) => (
					<div key={item.id} className="col-12 col-lg-1 p-0">
						<Link to={`/champ/${item.id}`}>
							<div className="card ">
								<img loading="lazy" src={`//ddragon.leagueoflegends.com/cdn/${version[0]}/img/champion/${item.image.full}`} className="card-img-top" alt="" />
								<div className="card-body p-0 pt-4">
									<h4 className="card-title">{item.name}</h4>
									<p>
										{item.tags.map((tags, i) => (
											<span key={tags + "" + i} dangerouslySetInnerHTML={{ __html: i === 0 ? tags : ", " + tags }}></span>
										))}
									</p>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</Fragment>
	);
}

export default Usuarios;
