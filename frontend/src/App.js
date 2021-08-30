import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {fetchCart, addToCart} from './store/cart-actions';
import Axios from 'axios';

let api = 'http://localhost:4100/';
let isInital = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state)=>state.ui.notification);

  useEffect(()=>{
    console.log('inside useEffect2 in App.js');
    if(isInital)
    {
      isInital = false;
      return;
    }
    dispatch(addToCart(cart));
  },[cart, dispatch]);

  useEffect(()=>{
    dispatch(fetchCart());
    isInital = true;
  }, [dispatch]);

  return (
    <React.Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;