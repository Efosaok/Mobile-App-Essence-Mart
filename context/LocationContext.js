import { useReducer, useEffect, useState } from 'react'
import constate from 'constate'
import logger from './Logger'

const initialState = {
  lastRouteBeforeAuth: null,
}

function reducer (state, action) {
  const { lastRoute, section } = action
  switch (action.type) {
    case 'LAST_ACTIVITY':
      return {
        ...state,
        lastRouteBeforeAuth: lastRoute
      }
    default:
      return state
  }
}

const loggerReducer = logger(reducer);

const useLocation = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data)

  useEffect(() => {
    setData(state)
  }, [state, setData])

  const { lastRouteBeforeAuth } = state

  const setLastActivity = store => {
    dispatch({
      type: 'LAST_ACTIVITY',
      store
    })
  }

  return {
    setLastActivity,
    lastRouteBeforeAuth
  }
}

export const [LocationProvider, useLocationContext] = constate(useLocation)
