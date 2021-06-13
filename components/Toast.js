import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Toast as ToastComponent } from 'galio-framework';

import { useToastContext } from '../context/ToastContext';
import nowTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

// color	string	'primary'	one of: 'primary', 'theme', 'info', 'error', 'warning', 'success'

const Toast = () => {
  const { toast } = useToastContext();

  return (
    <Block>
      <ToastComponent
        isShow={!!toast.message}
        positionIndicator="top"
        color={toast.type || 'error'}
      >
        This is a top positioned toast
      </ToastComponent>
    </Block>
    // <Text styles={{ ...styles.toast, ...styles[toast.type || 'error'] }}>
    //   {toast.message}
    // </Text>
  );
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  toast: {
    width,
    left: 0,
    right: 0,
    // boxShadow: '0 3px 8px rgba(0, 0, 0, 0.09)',

    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    // padding: 20 10,
    padding: '20 10',
    position: 'absolute',
    zIndex: 4,
    top: 100,
    backgroundColor: nowTheme.COLORS.MUTED,
    fontSize: 18,
    borderRadius: 3,
  },
  error: {
    backgroundColor: nowTheme.COLORS.ERROR,
    color: nowTheme.COLORS.WHITE,
  },
  success: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    color: nowTheme.COLORS.WHITE,
  },
  warning: {
    backgroundColor: nowTheme.COLORS.WARNING,
    color: nowTheme.COLORS.WHITE,
  }
})

export default Toast;
