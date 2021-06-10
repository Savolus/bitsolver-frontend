import { Link } from "react-router-dom"

import UserController from "./UserController"
import Search from "./Search"
import './header.scss'
import Nav from "./Nav"

export default () => {
	return (
		<header className='site-header'>
			<div className='header-container'>
				<div className='header-self'>
					<Link to='/'>BITSOLVER</Link>
				</div>
				<Nav />
				<Search />
				<UserController />
			</div>
		</header>
	)
}