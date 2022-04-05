// import logo from '../logo.svg';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
// import store from '../redux/configStore'

import Login from '../pages/Login';
import PostList from '../pages/PostList';
import Header from '../components/Header';

import '../App.css';
import { Button, Grid } from '../elements';
import Signup from '../pages/Signup';
// import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { actionCreators as userAction } from '../redux/modules/user'
import { apiKey } from './firebase';
import Permit from './Permit';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';

function App() {

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(session_key) ? true : false

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (is_session) {
      dispatch(userAction.loginCheckFB())
    }
  }, [])

  return (

    <React.Fragment>
      <Grid>
        <Header></Header>
        {/* <div className="App"></div> */}
        <ConnectedRouter history={history}>

          <Route exact path='/' component={PostList} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/write' component={PostWrite} />
          <Route exact path='/write/:id' component={PostWrite} />
          <Route exact path='/post/:id' component={PostDetail} />

        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text='+' _onClick={() => { history.push('/write') }}></Button>
      </Permit>
    </React.Fragment>

  );
}

export default App;
