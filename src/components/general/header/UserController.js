import Sign from "./Sign"
import SmallUser from "./SmallUser"

export default ({ isAuth = false }) => {
	return (
		<div className='header-user'>
			{
				!isAuth && <Sign /> || <SmallUser />
			}
		</div>
	)
}
