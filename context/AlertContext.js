import { useState } from 'react'
import constate from 'constate'

const defaultData = {
  title: '',
  message: '',
  type: '',
  closeOnTouchOutside: true,
  showConfirmButton: false,
  showCancelButton: false,
  progress: false,
  // onConfirm: () => {}
}

const alertProps = { message: '', title: '', progress: false, type: '', }

const useAlert = () => {
  const [alertState, setAlertState] = useState({ ...defaultData })

  const hideAlert = () => {
    setAlertState(prevState => ({ ...prevState, ...defaultData }))
  }

  const setAlert = (alertData = alertProps) => {
    setAlertState(prevState => ({ ...prevState, title: '', ...alertData }))
  }

  return { setAlert, alertState, hideAlert }
}

export const [AlertProvider, useAlertContext] = constate(useAlert)
