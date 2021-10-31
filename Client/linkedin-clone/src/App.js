import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns";

import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";


// import { Provider } from 'react-redux';
// import { ConfigureStore } from './redux/configureStore';

// const store = ConfigureStore();

function App() {
  return (
      // <Provider store={store}>
     
        <BrowserRouter>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="App">
              <Main/>
            </div>
          </MuiPickersUtilsProvider>
        </BrowserRouter>
     
      // </Provider>
  );
}

export default App;
