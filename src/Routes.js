import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NewProducts from './Pages/Main/NewProducts';
import HotProducts from './Pages/Main/HotProducts';
import MyPage from './Pages/Main/MyPage';
import Main from './Pages/Main';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/main" component={Main} />
          <Route exact path="mypage" component={MyPage} />
          <Route exact path="/newproducts" component={NewProducts} />
          <Route exact path="/hotproducts" component={HotProducts} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
