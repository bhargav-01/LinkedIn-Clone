import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns";
import { SnackbarProvider } from 'notistack';
import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";


// import { Provider } from 'react-redux';
// import { ConfigureStore } from './redux/configureStore';

// const store = ConfigureStore();

function App() {
  return (
      // <Provider store={store}>
     
        <BrowserRouter>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider>
            <div className="App">
              <Main/>
            </div>
          </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </BrowserRouter>
     
      // </Provider>
  );
}

export default App;
