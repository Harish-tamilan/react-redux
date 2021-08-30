import {cartActions} from './cart-slice';
import { uiActions } from './ui-slice';
import Axios from 'axios';

let api = 'http://localhost:4100/';

export const fetchCart = ()=>{
    
    return async(dispatch)=>{
        const fetchData = async ()=>{
            const response = await fetch(api+'getCart');
            if(!response.ok)
            {
                throw new Error("Error getting data from backend");
            }
            const responseData = await response.json();
            dispatch(cartActions.replaceCart(responseData));
        }
        fetchData().catch(()=>{
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }));
        });
    }
}

export const addToCart = (cart)=>{
    return async (dispatch)=>{
        const addItemToCart = async ()=>{
            console.log('inside addItemToCart in cart-actions.js, the data is ');
            dispatch(uiActions.showNotification({
                status:'pending',
                title:'Adding Cart item',
                message:'Sending...'
              }));
              //console.log(action.payload.cart);
              const response = await Axios.post(api+'addToCart', {cart});
              console.log(response);
              if(!response.data.ok)
              {
                throw new Error('Error in adding item to the cart');
              }
        }
        addItemToCart().then(()=>{
            dispatch(uiActions.showNotification({
              status:'success',
              title:'Adding Cart item',
              message:'Cart item sent successfully'
            }))
          }).catch((error)=>{
            dispatch(uiActions.showNotification({
              status: 'error',
              title: 'Error!',
              message: 'Sending cart data failed!'
            }))
          })
    }
}