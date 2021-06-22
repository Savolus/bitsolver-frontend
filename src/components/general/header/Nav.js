import { Link } from "react-router-dom"

export default () => {
	return (
		<nav className='header-nav'>
			<ul className='header-nav-ul'>
				<li className='header-nav-li'>
					<Link to='/posts'>Posts</Link>
				</li>
				<li className='header-nav-li'>
					<Link to='/users'>Users</Link>
				</li>
				<li className='header-nav-li'>
					<Link to='/tags'>Tags</Link>
				</li>
			</ul>
		</nav>
	)
}
