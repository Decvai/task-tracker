import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { persistor, store } from './app/store';
import './styles/index.scss';
import { Loader } from './utils/Loader/Loader';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <Loader />
        </div>
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
