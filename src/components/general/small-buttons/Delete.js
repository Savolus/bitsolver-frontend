import { IconContext } from "react-icons"
import { FaTrashAlt } from 'react-icons/fa'

export default ({ onDelete }) => (
  <div className='delete' onClick={onDelete}>
    <IconContext.Provider value={{ size: '1.2rem' }}>
      <FaTrashAlt />
    </IconContext.Provider>
  </div>
)
