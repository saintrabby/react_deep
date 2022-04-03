// import logo from '../logo.svg';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import store from '../redux/configStore'

import Login from '../pages/Login';
import PostList from '../pages/PostList';
import Header from '../components/Header';

import '../App.css';
import { Grid } from '../elements';
import Signup from '../pages/Signup';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Grid>
          <Header></Header>
          {/* <div className="App"></div> */}
          <ConnectedRouter history={history}>

            <Route exact path='/' component={PostList} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

          </ConnectedRouter>
        </Grid>
      </React.Fragment>
    </Provider>
  );
}

export default App;
