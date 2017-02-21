import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Redirect } from 'react-router';

import { MessageApp } from '../js/components/message';
import { Room } from '../js/components/room';


// We're using routes from react-routes on client side
// instead of the node ones.

ReactDOM.render(
		<Router history={ hashHistory }>
			<Redirect from="/" to="/welcome" />
			<Route path="/welcome" component={ MessageApp } />
			<Route path="/private/:id" component={ Room }/>
			<Redirect from="/*" to="/welcome" />
		</Router>
	, rootNode);

