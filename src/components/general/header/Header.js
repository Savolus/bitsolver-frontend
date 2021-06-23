import UserController from "./UserController"
import Self from './Self'
import Nav from "./Nav"
import './header.scss'

export default () => (
	<header className='site-header'>
		<div className='header-container'>
			<Self />
			<Nav />
			<UserController />
		</div>
	</header>
)
