import { useReducer, useEffect, useState } from 'react'
import constate from 'constate'
import logger from './Logger'

const initialState = {
  store: null,
  section: null
}

function reducer (state, action) {
  const { store, section } = action
  switch (action.type) {
    case 'ACTIVE_STORE':
      return {
        ...state,
        store
      }
    case 'STORE_SECTION':
      return {
        ...state,
        section
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

  const { store, section } = state

  const setActiveStore = store => {
    dispatch({
      type: 'ACTIVE_STORE',
      store
    })
  }

  const setStoreSection = store => {
    dispatch({
      type: 'STORE_SECTION',
      store
    })
  }

  return {
    setActiveStore,
    setStoreSection,
    store,
    section
  }
}

export const [StoreListProvider, useStoreListContext] = constate(useStoreList)
