import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Styles.css";

function Usuario() {
	const [usuario, setUsuario] = useState([]);
	const { id } = useParams();
	const champId = id;

	const obtenerUsuario = async () => {
		const resVersion = await axios.get("//ddragon.leagueoflegends.com/api/versions.json");
		const version = await resVersion.data;

		const resChamp = await axios.get(`//ddragon.leagueoflegends.com/cdn/${version[0]}/data/es_MX/champion/${champId}.json`);
		const champ = await resChamp.data;
		const champList = Object.values(champ.data);
		setUsuario(champList);
	};

	useEffect(() => {
		obtenerUsuario();
	}, []);

	return (
		<Fragment>
			{usuario.map((item, i) => (
				<div key={item + "" + i} className="container">
					<h1 className="mb-3">{item.name}</h1>
					<h3>{item.title}</h3>
					<hr />

					<h2 className="mb-2">Lore</h2>
					<p dangerouslySetInnerHTML={{ __html: item.lore }}></p>
					<hr />

					<h2 className="mb-2">Skins</h2>

					<div id={`carrusel-${item.id}`} className="carousel slide" data-bs-ride="carousel">
						<div className="carousel-inner">
							{item.skins.map((skin, i) => (
								<div key={skin.num + "" + i} className={`carousel-item ${skin.num === 0 ? "active" : ""}`}>
									<img src={`//ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_${skin.num}.jpg`} alt={skin.name} className="d-block w-100" />
									<div className="carousel-caption d-none d-md-block">
										<h5>{item.name}</h5>
										<p>{skin.name === "default" ? "Skin Base" : skin.name}</p>
									</div>
								</div>
							))}
						</div>
						<button className="carousel-control-prev" type="button" data-bs-target={`#carrusel-${item.id}`} data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target={`#carrusel-${item.id}`} data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>

					<hr />
					<h2 className="mb-2">Rol</h2>
					<p>
						{item.tags.map((tags, i) => (
							<span key={tags + "" + i} className="px-2" dangerouslySetInnerHTML={{ __html: tags }}></span>
						))}
					</p>

					<hr />

					<h2 className="mb-2">Ventajas</h2>
					{item.allytips.map((allytips, i) => (
						<p key={allytips + "" + i} dangerouslySetInnerHTML={{ __html: allytips }}></p>
					))}
					<hr />

					<h2 className="mb-2">Desventajas</h2>
					{item.enemytips.map((enemytips, i) => (
						<p key={enemytips + " " + i} dangerouslySetInnerHTML={{ __html: enemytips }}></p>
					))}
					<hr />

					<h2 className="mb-4">Pasiva</h2>
					<div className="row justify-content-center">
						<div className="col-12 col-lg-3">
							<img loading="lazy" src={`//ddragon.leagueoflegends.com/cdn/12.2.1/img/passive/${item.passive.image.full}`} alt={item.passive.name} />
							<p className="mt-3">
								<strong>{item.passive.name}</strong>
							</p>
							<p dangerouslySetInnerHTML={{ __html: item.passive.description }}></p>
						</div>
					</div>
					<hr />

					<h2 className="mb-4">Habilidades</h2>
					<div className="row justify-content-center">
						{item.spells.map((spells, i) => (
							<div key={spells + "" + i} className="col-12 col-lg-3">
								<img loading="lazy" src={`//ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/${spells.image.full}`} alt={spells.name} />
								<p className="mt-3">
									<strong>{spells.name}</strong>
								</p>
								<p dangerouslySetInnerHTML={{ __html: spells.description }}></p>
							</div>
						))}
					</div>
					<hr />
				</div>
			))}
		</Fragment>
	);
}

export default Usuario;
