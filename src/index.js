import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import './index.css';
import App from './App';
import BigTable from './component/BigTable'
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history }  from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './style/index.less'
let store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path="/app" component={App}/>
                <Route path="/index" component={BigTable}/>
            </div>
        </Router>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
