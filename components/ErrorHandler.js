import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/react-native";
import { View, StyleSheet, Button } from "react-native";
import { Text } from "galio-framework";

const myErrorHandler = (error) => {
  // Do something with the error
  // E.g. reporting errorr using sentry ( see part 3)
  Sentry.captureException(error);
};

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong: </Text>
        {/* <Text> {error.message} </Text> */}
        <Button title="try Again" onPress={resetErrorBoundary} />
      </View>
    </View>
  );
}

export const ErrorHandler = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
});
