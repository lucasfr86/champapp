import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Styles.css";

function Buscador() {
	const [users, setUsers] = useState([]);
	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [version, setVersion] = useState([]);

	useEffect(() => {
		const loadUsers = async () => {
			const resVersion = await axios.get("//ddragon.leagueoflegends.com/api/versions.json");
			const version = await resVersion.data;
			setVersion(version);
			const response = await axios.get(`//ddragon.leagueoflegends.com/cdn/${version[0]}/data/es_MX/champion.json`);
			const champs = await response.data;
			const champsList = Object.values(champs.data);
			setUsers(champsList);
		};
		loadUsers();
		return () => {
			setSuggestions([]); // This worked for me
		};
	}, []);
	const onSuggestHandler = (text) => {
		setText(text);
	};
	const onChangeHandler = (text) => {
		let matches = [];
		if (text.length > 0) {
			matches = users.filter((user) => {
				const regex = new RegExp(`${text}`, "gi");
				return user.name.match(regex);
			});
		}
		setSuggestions(matches);
		setText(text);
	};
	return (
		<Fragment>
			<h2 className="text-center">Buscar Campeón</h2>
			<div className="row my-4 mb-5 justify-content-center">
				<div className="col-12 col-lg-6  text-center">
					<div className="contentBuscador">
						<input
							className="form-control"
							type="text"
							placeholder="Ingresar nombre de campeon..."
							onChange={(e) => onChangeHandler(e.target.value)}
							onFocus={(e) => onChangeHandler(e.target.value)}
							value={text}
							onBlur={() => {
								setTimeout(() => {
									setSuggestions([]);
								}, 100);
							}}
						/>
						<ul className="list-group">
							{suggestions &&
								suggestions.map((suggestions, i) => (
									<li className="list-group-item p-0" onClick={() => onSuggestHandler(suggestions.name)} key={i}>
										<Link className="linkChamp p-2" to={`/champ/${suggestions.id}`}>
											<div className="row">
												<div className="col-2 ">
													<img src={`//ddragon.leagueoflegends.com/cdn/${version[0]}/img/champion/${suggestions.image.full}`} alt={suggestions.nam} alt={suggestions.name} className="w-100" />
												</div>
												<div className="col-10 px-0 text-start">
													<h5 className="mt-0 mb-1">{suggestions.name}</h5>
													<h6 className="mt-0 mb-1">{suggestions.title}</h6>
													<p className="mt-0 mb-0">
														{suggestions.tags.map((tags, i) => (
															<span key={tags + "" + i} dangerouslySetInnerHTML={{ __html: i === 0 ? tags : ", " + tags }}></span>
														))}
													</p>
												</div>
											</div>
										</Link>
									</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Buscador;
