import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Toast, Block, theme } from 'galio-framework';
import { Toast as ToastComponent, Block } from 'galio-framework';

import { useToastContext } from 'context/ToastContext';
import nowTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

// color	string	'primary'	one of: 'primary', 'theme', 'info', 'error', 'warning', 'success'

function Toast() {
  const { toast } = useToastContext();

  return !toast.message ? null : (
    <Block>
      <ToastComponent
        isShow={isShow}
        positionIndicator="top"
        color={toast.type || 'error'}
      >
        This is a top positioned toast
      </ToastComponent>
    </Block>
    // <Text styles={{ ...styles.toast, ...styles[toast.type] }}>
    //   {toast.message}
    // </Text>
  );
}

// const styles = StyleSheet.create({
//   toast: {
//     width: width,
//     left: 0,
//     right: 0,
//     // boxShadow: '0 3px 8px rgba(0, 0, 0, 0.09)',

//     shadowColor: theme.COLORS.BLACK,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     shadowOpacity: 0.2,
//     elevation: 4,
//     // padding: 20 10,
//     padding: '20 10',
//     position: fixed,
//     zIndex: 4,
//     top: 100,
//     background: nowTheme.COLORS.MUTED,
//     fontSize: 18,
//     borderRadius: 3,
//   },
//   error: {
//     backgroundColor: nowTheme.COLORS.ERROR,
//     color: theme.COLORS.WHITE,
//   },
//   success: {
//     backgroundColor: nowTheme.COLORS.SUCCESS,
//     color: theme.COLORS.WHITE,
//   },
//   warning: {
//     backgroundColor: nowTheme.COLORS.WARNING,
//     color: theme.COLORS.WHITE,
//   }
// })

export default Toast;
