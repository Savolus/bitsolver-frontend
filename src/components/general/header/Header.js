import { Link } from "react-router-dom"

import UserController from "./UserController"
import Nav from "./Nav"
import './header.scss'

export default () => {
	return (
		<header className='site-header'>
			<div className='header-container'>
				<div className='header-self'>
					<Link to='/'>
						<h1>
							BITSOLVER
						</h1>
					</Link>
				</div>
				<Nav />
				<UserController />
			</div>
		</header>
	)
}
