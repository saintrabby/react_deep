// import logo from '../logo.svg';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';

import Login from '../pages/Login';
import PostList from '../pages/PostList';
import Header from '../components/Header';
import store from '../redux/configStore'

import './App.css';
import { Grid } from '../elements';
import Signup from '../pages/Signup';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Grid>
          <Header></Header>
          <ConnectedRouter history={history}>
          {/* <BrowserRouter history={history}> */}
            {/* <div className="App">
      </div> */}
              <Route path='/' element={<PostList />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
          {/* </BrowserRouter> */}
          </ConnectedRouter>
        </Grid>
      </React.Fragment>
    </Provider>
  );
}

export default App;
