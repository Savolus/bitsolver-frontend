export default ({ title, content, image }) => (
  <div className='home-card'>
    <div className='home-card-row'>
      <img src={image} />
    </div>
    <div className='home-card-row'>
      <h3>
        { title }
      </h3>
    </div>
    <div className='home-card-row'>
      <p>
        { content }
      </p>
    </div>
  </div>
)
