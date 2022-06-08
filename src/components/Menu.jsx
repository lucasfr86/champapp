import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

function Menu() {
	return (
		<Fragment>
			<div className="content-nav sticky m-0 py-3">
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-6 text-start links-nav">
							<Link to="/">Campeones</Link> | <Link to="/summoners">Summoners</Link>
						</div>
						<div className="col-12 col-lg-6 text-end logo-text">
							<strong>ChampApp</strong> by lucky
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Menu;
