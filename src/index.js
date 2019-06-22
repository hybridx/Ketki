import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Reviews from './components/pages/Reviews';
import Contact from './components/pages/Contact';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(<Router>
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/reviews' component={Reviews} />
        <Route path='/contact' component={Contact} />
    </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
