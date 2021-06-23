import { Link } from "react-router-dom"

export default () => (
	<div className='header-sign'>
		<Link to='/signin' className='header-log-in header-sign-button'>
			Sign in
		</Link>
		<Link to='/signup' className='header-sign-up header-sign-button'>
			Sign Up
		</Link>
	</div>
)
