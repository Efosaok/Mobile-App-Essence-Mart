import { useEffect, useReducer } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage';
import firebase from '../shared/firebase';

export const initialState = {
  token: '',
  isAuthenticated: null,
  enlistHide: false,
  partners: [],
  user: null,
  isLoggedIn: false
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {...state.user, ...action.payload.user },
        token: action.data.token,
        isLoggedIn: !!action.payload.user,
        partners: action.data.partners || [],
        isAuthenticated: true
      };

    case 'SET_PARTNERS':
      return {...state, partners: action.data};

    case 'LOGOUT_SUCCESSFUL':
      return {
        ...initialState,
        isLoggedIn: false,
        enlistHide: state.enlistHide
      };

    case 'ENLISTHIDE':
      return {...state, enlistHide: action.data.enlistHide};

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useUser = () => {
  const [data, setData] = useLocalStorage('user', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state)
  }, [state, setData]);

  const {
    user,
    token,
    partners,
    isAuthenticated,
    enlistHide,
    isLoggedIn
  } = state;

  const setUser = (user, token, partners) => {
    dispatch({
      type: 'SET_USER',
      payload: { user },
      data: { token, partners }
    })
  };

  const setPartners = (partners) => {
    dispatch({
      type: 'SET_PARTNERS',
      data: [partners].flat()
    })
  };

  const logoutSuccess = () => {
    return firebase.auth().signOut().then(() => {
      dispatch({
        type: 'LOGOUT_SUCCESSFUL',
      })
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      })
  };

  const setEnlistHide = (enlistHide) => {
    dispatch({
      type: 'ENLISTHIDE',
      data: { enlistHide }
    })
  };

  return {
    // state
    user,
    token,
    isAuthenticated,
    enlistHide,
    partners,
    isLoggedIn,
    // methods
    setUser,
    setPartners,
    logoutSuccess,
    setEnlistHide
  }
};

export const [UserProvider, useUserContext] = constate(useUser);
