import React from 'react';
import ReactDOM from 'react-dom';
import { MessageApp } from '../js/components/message';
import { Router, Route, hashHistory, Redirect } from 'react-router';

// We're using routes from react-routes on client side
// instead of the node ones.

ReactDOM.render(
		<Router history={hashHistory}>
			<Redirect from="/" to="/welcome" />
			<Route path="/welcome" component={MessageApp} />
		</Router>
	, rootNode);

// ReactDOM.render(<MessageApp />, rootNode);