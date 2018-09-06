import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import './index.css';
import Login from './component/login/Login';
import BigTable from './component/BigTable'
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history }  from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import './style/index.less';
let store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={BigTable}/>
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
