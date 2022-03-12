import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
