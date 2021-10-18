import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Components/Login/LoginComponent';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { ConfigureStore } from './redux/configureStore';

// const store = ConfigureStore();

function App() {
  return (
      // <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Login/>
          </div>
        </BrowserRouter>
      // </Provider>
  );
}

export default App;
