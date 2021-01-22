import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function HeaderWidget() {
  const { container, textStyle } = styles;
  return (
    <View style={container}>
      <Text style={textStyle}>Registration</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 70,
        margin: 'auto',
        textAlign: 'center',
        maxHeight: 70,
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        position: 'relative',
        elevation: 2,
        paddingTop: 30
    },
    textStyle: {
        fontSize: 20
    }
})
