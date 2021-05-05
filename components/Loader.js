import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { Button } from '.';
import { nowTheme } from '../constants';

export default function Loader(props) {
  const { isLoading, text, onPress, showButton } = props;

  return (
    <AnimatedLoader
      visible={isLoading}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("../shared/41494-loader-animation-11.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text style={{ textAlign: 'center' }}>{text || 'Loading'}...</Text>

      {(onPress && showButton) &&
      <Button onPress={onPress} small color="transparent" textStyle={{ color: nowTheme.COLORS.PRIMARY, fontSize: 14 }}>
        Cancel
      </Button>
      }
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});
