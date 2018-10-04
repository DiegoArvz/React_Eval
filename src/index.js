import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'
import {BrowserRouter} from 'react-router-dom'

const store = createStore(reducer);

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App></App>
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
