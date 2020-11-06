import React, {FC} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
// import Store from './store';
import Home from './page/home';
import ProtectedPage from "./page/protectedPage";
import Login from './page/login';
import NotFound from './page/notFound';

const App: FC = () => (
	// <Store>
	<Router>
		<Switch>
			<Redirect from='/' to='/home' exact={true}/>
			<Route path='/home' component={Home}/>
			<Route path='/protected' component={ProtectedPage}/>
			<Route path='/login' component={Login}/>
			<Route component={NotFound}/>
		</Switch>
	</Router>
	// </Store>
);

export default App;
