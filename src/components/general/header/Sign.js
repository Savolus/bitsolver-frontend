import { Link } from "react-router-dom"

export default () => {
	return (
		<div className='header-sign'>
			<Link to='/login' className='header-log-in header-sign-button'>Sign in</Link>
			<Link to='/register' className='header-sign-up header-sign-button'>Sign Up</Link>
		</div>
	)
}
