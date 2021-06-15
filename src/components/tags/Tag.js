export default ({ id, title, description }) => {
  return (
    <div data-id={id} className='tag-card'>
      <span className='tag-card-title'>
        { title }
      </span>
      <p className='tag-card-description'>
        { description }
      </p>
    </div>
  )
}
