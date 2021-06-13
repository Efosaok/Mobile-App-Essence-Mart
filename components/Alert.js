import React from 'react';
 
import AwesomeAlert from 'react-native-awesome-alerts';
import { useAlertContext } from '../context/AlertContext';
 
const Alert = () => {
 const { alertState, hideAlert } = useAlertContext()
 const { closeOnTouchOutside, showConfirmButton, showCancelButton, message, title, progress } = alertState

  return (
    <AwesomeAlert
      show={!!message}
      showProgress={progress}
      title={title}
      message={message}
      closeOnTouchOutside={closeOnTouchOutside}
      closeOnHardwareBackPress={false}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText="No, cancel"
      confirmText="Yes, delete it"
      confirmButtonColor="#DD6B55"
      onCancelPressed={hideAlert}
      onConfirmPressed={hideAlert}
    />
  );
};

export default Alert
