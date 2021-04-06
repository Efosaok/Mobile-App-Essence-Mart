import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default function Loader(props) {
  const { isLoading, text } = props;

  return (
    <AnimatedLoader
      visible={isLoading}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("../shared/41494-loader-animation-11.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text>{text || 'Loading'}...</Text>
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});
