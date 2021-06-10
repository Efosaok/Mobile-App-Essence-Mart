import { useEffect, useReducer } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage';
import firebase from '../shared/firebase';

export const initialState = {
  token: '',
  refreshToken: '',
  isAuthenticated: null,
  user: null,
  hasUserUpdate: false,
  isLoggedIn: false
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_USER': {
      // const { user } = action.payload
      // const stsTokenManager = user && user.stsTokenManager
      return {
        ...state,
        user: {...state.user, ...action.payload.user },
        // token: stsTokenManager && stsTokenManager.accessToken,
        // refreshToken: stsTokenManager && stsTokenManager.refreshToken,
        isLoggedIn: !!action.payload.user,
        partners: action.data.partners || [],
        isAuthenticated: !!action.payload.user
      };
    }

    case 'UPDATE_USER': {
      return {
        ...state,
        user: {...state.user, ...action.payload.user },
        hasUserUpdate: true
      };
    }

    case 'LOGOUT_SUCCESSFUL':
      return {
        ...initialState,
        isLoggedIn: false,
        enlistHide: state.enlistHide
      };

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

  const setUser = (user, token, partners) => {
    dispatch({
      type: 'SET_USER',
      payload: { user },
      data: { token, partners }
    })
  };

  const updateUser = (user) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: { user },
    })
  };

  const logoutSuccess = () => {
    try {
      return firebase.auth().signOut().then(() => {
        dispatch({
          type: 'LOGOUT_SUCCESSFUL',
        })
      })
      .catch((error) => {
        console.log(`There has been a problem with your fetch operation: ${  error.message}`);
        // ADD THIS THROW error
        // throw error;
      })
    } catch (error) {
      console.log('logoutSuccess error', error)
    }
  };

  const {
    user,
    token,
    partners,
    isAuthenticated,
    enlistHide,
    isLoggedIn
  } = state;

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
    updateUser,
    logoutSuccess,
  }
};

export const [UserProvider, useUserContext] = constate(useUser);
