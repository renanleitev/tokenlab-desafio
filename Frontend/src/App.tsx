import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Header from './components/_UI/Header';
import RoutesController from './routes/RoutesController';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <RoutesController />
      </Router>
    </Provider>
  );
};

export default App;
