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
import NewProducts from './pages/main/NewProducts';
import HotProducts from './pages/main/HotProducts';
import MyPage from './pages/main/mypage/[keyword]';
import Detail from './pages/detail/[id]';

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

// main/mypage/cart : 장바구니
// main/mypage/payment : 결제 Order컴포넌트
// main/mypage/orderlist : 주문내역
