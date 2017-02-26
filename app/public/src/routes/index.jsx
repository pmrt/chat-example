import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory, Redirect } from 'react-router';

import { MessageApp } from '../js/components/general';
import { Private } from '../js/components/private';
import { ChatList } from '../js/components/chatlist';
import { Container } from '../js/components/container';


// We're using routes from react-routes on client side
// instead of the node ones.

ReactDOM.render(
			<Router history={ hashHistory }>
				<Route path="/" component={Container}>
				  	<IndexRoute component={MessageApp} />
						<Route path="/private/:id" component={Private} />
				</Route>
			</Router>
		, rootNode);