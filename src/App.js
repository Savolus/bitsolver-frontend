import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

import CreateComment from './components/comments/CreateComment'
import EditComment from './components/comments/EditComment'
import ProfileEdit from './components/profile/ProfileEdit'
import Header from './components/general/header/Header'
import Footer from './components/general/footer/Footer'
import SinglePost from './components/posts/SinglePost'
import CreatePost from './components/posts/CreatePost'
import SignleUser from './components/users/SignleUser'
import SingleTag from './components/tags/SingleTag'
import EditPost from './components/posts/EditPost'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Posts from './pages/Posts'
import Users from './pages/Users'
import Tags from './pages/Tags'
import Home from './pages/Home'

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

export default () => (
	<BrowserRouter>
		<Header />
		<main className='site-main'>
			<Switch>
				<Route path='/' exact component={ Home }/>
				<Route path='/signin' component={ SignIn }/>
				<Route path='/signup' component={ SignUp }/>
				<Route path='/profile/edit' component={ ProfileEdit }/>
				<Route path='/profile' component={ Profile }/>
				<Route path='/tags/:id' component={ SingleTag }/>
				<Route path='/tags' component={ Tags }/>
				<Route path='/posts/create' component={ CreatePost }/>
				<Route path='/posts/:postId/comments/:commentId/edit' component={ EditComment }/>
				<Route path='/posts/:postId/comments/create' component={ CreateComment }/>
				<Route path='/posts/:id/edit' component={ EditPost }/>
				<Route path='/posts/:id' component={ SinglePost }/>
				<Route path='/posts' component={ Posts }/>
				<Route path='/users/:id' component={ SignleUser }/>
				<Route path='/users' component={ Users }/>
			</Switch>
		</main>
		<Footer />
	</BrowserRouter>
)
