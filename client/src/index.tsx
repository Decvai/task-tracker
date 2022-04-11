import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { LoadingPage } from './components/LoadingPage/LoadingPage';
import { persistor, store } from './app/store';
import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
