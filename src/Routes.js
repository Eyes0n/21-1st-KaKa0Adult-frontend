import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Character from './Pages/Character';
import NewProducts from './Pages/Main/NewProducts';
import HotProducts from './Pages/Main/HotProducts';
import MyPage from './Pages/Main/MyPage';
import Detail from './Pages/Detail';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/products/newList" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/products/newList" component={NewProducts} />
          <Route exact path="/products/hot" component={HotProducts} />
          <Route exact path="/products/character/:id" component={Character} />
          <Route exact path="/products/:id" component={Detail} />
          <Route exact path="/mypage/:keyword" component={MyPage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
