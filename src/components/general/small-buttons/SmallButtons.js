import Delete from "./Delete";
import Edit from "./Edit";

export default ({ isEdit, isDelete, prefix, onDelete }) => (
  <div className='small-buttons'>
    { isEdit && <Edit prefix={prefix} /> }
    { isDelete && <Delete onDelete={onDelete} /> }
  </div>
)
