import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './router/router'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import {store} from './store/store'


ReactDOM.render( 
<Provider store={store} >
    <AppRoutes  />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
