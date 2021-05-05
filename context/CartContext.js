import { useReducer, useEffect } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage';

const Quantity = (item) => Number(item.quantity) || 1;

/**
 * Cart = [{
 *  price: '',
 *  description: '',
 *  Image: ''
 * }]
 */
const initialState = {
  cart: null,
  payment: null,
  store: null,
  histories: null
}

function reducer (state, action) {
  const { cart, index, data, store, histories } = action
  switch (action.type) {
    case 'INITIALIZE_CART_PAYMENT':
      return {
        ...state,
        payment: data
      }

    case 'UPDATE_CART_PAYMENT':
      return {
        ...state,
        payment: {
          ...state.payment,
          ...data
        }
      }

    case 'UPDATE_HISTORY':
      return {
        ...state,
        histories: histories
      }

    case 'ADD_TO_CART':
      return {
        ...state,
        cart
      }

    case 'CURRENT_STORE':
      return {
        ...state,
        store
      }

    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        cart: state.cart && state.cart.filter((itm, indx) => indx !== index)
      }

    case 'INCREASE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart && state.cart.map((itm, indx) => ({
          ...itm,
          quantity: indx === index ? Quantity(itm) + 1 : Quantity(itm)
        }))
      }

    case 'DECREASE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart && state.cart.map((itm, indx) => ({
          ...itm,
          quantity: indx === index && Quantity(itm) > 1 ? Quantity(itm) - 1 : Quantity(itm)
        }))
      }

    default:
      return state
  }
}

const loggerReducer = logger(reducer);

const useCart = () => {
  const [data, setData] = useLocalStorage('cart', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state)
  }, [state, setData])

  const addToCart = cart => {
    dispatch({
      type: 'ADD_TO_CART',
      cart
    })
  }

  const setHistory = histories => {
    dispatch({
      type: 'UPDATE_HISTORY',
      histories
    })
  }

  const initailizeCartPayment = ({ data }) => {
    dispatch({
      type: 'INITIALIZE_CART_PAYMENT',
      data
    })
  }

  const updateCartPayment = ({ data }) => {
    dispatch({
      type: 'UPDATE_CART_PAYMENT',
      data
    })
  }

  const setCurrentStore = store => {
    dispatch({
      type: 'CURRENT_STORE',
      store
    })
  }

  const removeItemInCart = index => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
      index
    })
  }

  const increaseItemQuantity = index => {
    dispatch({
      type: 'INCREASE_CART_ITEM_QUANTITY',
      index
    })
  }

  const decreaseItemQuantity = index => {
    dispatch({
      type: 'DECREASE_CART_ITEM_QUANTITY',
      index
    })
  }

  const { cart, payment, store, histories } = state

  return {
    addToCart,
    removeItemInCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    initailizeCartPayment,
    updateCartPayment,
    setCurrentStore,
    setHistory,
    store,
    cart,
    payment,
    histories
  }
}

export const [CartProvider, useCartContext] = constate(useCart)
