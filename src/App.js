import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './components/general/header/Header'

import Home from './pages/Home'
import Posts from './pages/Posts'
import Users from './pages/Users'
import Cookies from 'js-cookie'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Tags from './pages/Tags'

axios.interceptors.request.use(
  config => {
    const access_token = Cookies.get('access_token')

    config.headers.authorization = `Bearer ${access_token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main className='site-main'>
					<Switch>
						<Route path='/' exact component={ Home }/>
						<Route path='/signin' component={ SignIn }/>
						<Route path='/signup' component={ SignUp }/>
						<Route path='/posts' component={ Posts }/>
						<Route path='/users' component={ Users }/>
						<Route path='/tags' component={ Tags }/>
					</Switch>
				</main>
			</BrowserRouter>
		</>
	)
}
