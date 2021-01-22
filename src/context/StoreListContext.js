import { useReducer, useEffect, useState } from 'react'
import constate from 'constate'
import logger from './Logger'

const initialState = {
  store: null
}

function reducer (state, action) {
  const { store } = action
  switch (action.type) {
    case 'ACCESS_STORE':
      return {
        ...state,
        store
      }
    default:
      return state
  }
}

const loggerReducer = logger(reducer);

const useStoreList = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data)

  useEffect(() => {
    setData(state)
  }, [state, setData])

  const { store } = state

  const setAccessedStore = store => {
    dispatch({
      type: 'ACCESS_STORE',
      store
    })
  }

  return {
    setAccessedStore,
    store
  }
}

export const [StoreListProvider, useStoreListContext] = constate(useStoreList)
