import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'
import FontAwesome from 'react-native-vector-icons/Ionicons'
import RNRestart from 'react-native-restart'
import * as Sentry from "@sentry/react-native";
import { Text, Block } from 'galio-framework';

import nowTheme from '../constants/Theme';
// some button component
import Button from './Button'
import logger from '../config/logger';

const { width } = Dimensions.get('screen');

class ErrorBoundary extends React.Component {
  constructor() {
    super()

    this.state = {
      error: false
    }
  }

  static getDerivedStateFromError () {
    return { error: true };
  }

  componentDidCatch (error, errorInfo) {
    logger.error('error, errorInfo', error, errorInfo)
    // deal with errorInfo if needed
    Sentry.captureException(error);
  }

   async handleBackToSignIn () {
    // remove user settings
    await this.destroyAuthToken();
    // restart app
    RNRestart.Restart();
  }

  async destroyAuthToken () {
    return this.state
    // await AsyncStorage.removeItem('user_settings');
  }

  render () {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <Block style={styles.safeAreaView}>{/* style={styles.safeAreaView} */}
          <View style={styles.container}>{/* style={styles.container} */}
            <View>{/* style={styles.content} */}
              <Text style={{ width: '100%', }}>
                <FontAwesome
                  name='ios-information-circle-outline'
                  size={60}
                  color={nowTheme.COLORS.PRIMARY}
                />
              </Text>
              <Text style={{ fontSize: 32 }}>Oops, Something Went Wrong</Text>
              <Text style={{ marginVertical: 10, lineHeight: 23, fontWeight: '500', }}>
                The app ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press the button below to restart the app and sign back in. Please contact us if this issue persists.
              </Text>
              <Button
                label="Back to Sign In Screen"
                onPress={this.handleBackToSignIn}
                style={{
                  marginVertical: 15, 
                }}
              >
                  {/* try Again || Back to Sign In Screen */}
                <Text style={styles.button}>Try Again</Text>
              </Button>
            </View>
          </View>
        </Block>
      )
    } 
      return children;
    
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    width,
    // height,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
    marginVertical: 35,
  },
  button: {
    color: nowTheme.COLORS.WHITE
  }
});

export default ErrorBoundary;