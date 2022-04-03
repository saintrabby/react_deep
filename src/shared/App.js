// import logo from '../logo.svg';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';
// import { history } from '../redux/configStore';
// import store from '../redux/configStore'

import Login from '../pages/Login';
import PostList from '../pages/PostList';
import Header from '../components/Header';

import '../App.css';
import { Grid } from '../elements';
import Signup from '../pages/Signup';

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        {/* <div className="App">
      </div> */}
        <BrowserRouter>

          <Route exact path='/' component={PostList} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />

        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
