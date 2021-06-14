import { useSelector } from "react-redux"
import SmallUser from "./SmallUser"
import Sign from "./Sign"

export default () => {
	const accessor = useSelector(state => state.accessor.value)

	return (
		<div className='header-user'>
			{
				!accessor && <Sign /> || <SmallUser />
			}
		</div>
	)
}
