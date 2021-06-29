import websiteProgrammer from '../images/website-programmer.svg'
import './scss/home.scss'

import card1Image from '../images/programmer.svg'
import card2Image from '../images/individual-hobby-websites.svg'
import card3Image from '../images/60c707a90eed3a1e92d11040.png'
import card4Image from '../images/8b08ed0cb7a60f9372a160fcbacb47b1.jpg'
import Card from '../components/home/Card'

export default () => (
	<>
		<div className='home-row'>
			<div className='home-about'>
				<h2>
					The place where you <span className='cunia'>solve</span> your <span className='cunia'>bit</span> problems
				</h2>
				<p>
					You can become the part of the most glorious programmer community! Let's <span className='cunia'>solving</span> together!
				</p>
			</div>
			<div className='home-image-container'>
				<img className='home-image' src={websiteProgrammer} />
			</div>
		</div>
		<div className='home-row rows2'>
			<div className='home-cards-title'>
				<h2>
					Our ideas are:
				</h2>
			</div>
			<div className='home-cards'>
				<Card
					image={card1Image}
					title='Big programmer community'
					content='We have the biggest programmer community for helping you!'
				/>
				<Card
					image={card2Image}
					title='100+ of themes'
					content='We have the biggest collection of themes!'
				/>
				<Card
					image={card3Image}
					title='Connect to out big family'
					content='Become a part of out big programmer family to help others'
				/>
				<Card
					image={card4Image}
					title='Connect to out big family'
					content='Become a part of out big programmer family to help others'
				/>
			</div>
		</div>
	</>
)
