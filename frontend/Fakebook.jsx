var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;

var App = require('./components/app.jsx');
var Timeline = require('./components/displays/timeline.jsx');
var LogIn = require('./components/forms/_logIn');
var SessionStore = require('./stores/sessionStore');
var SessionUtil = require('./util/sessionUtil');

var routes = (
  <Route path="/" component={App} onEntry={this.checkLoggedIn}>
    <Route path="/user/:id" component={ Timeline } onEntry={this.checkLoggedIn}/>

		<Route path="/login" component={LogIn}/>
  </Route>
);

var checkLoggedIn = function (nextState, replace, completion) {
	if (SessionStore.userFetched()){
		completion();
	} else {
		SessionUtil.fetchCurrentUser(completion);
	}
};

var ensureLoggedIn = function (nextState, replace, completion) {
	if (SessionStore.userFetched()){
		_redirectIfNotLoggedIn();
	} else {
		SessionUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
	}

	function _redirectIfNotLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      replace("/login");
    }
    completion();
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>, document.getElementById('root')
  );
});
