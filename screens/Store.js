import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Block, theme, Text, Button } from "galio-framework";
import { useStoreListContext } from '../context/StoreListContext'
import { WebView } from "react-native-webview";
import { nowTheme } from '../constants'

const { width } = Dimensions.get('screen');

export default function DetailsScreen(props) {
  const { store } = useStoreListContext()

  return (
    <SafeAreaView style={styles.container}>
      <Block flex center style={styles.wrapper}>
        {/* <Button
          color={nowTheme.COLORS.SECONDARY}//"#e65100"
          title="Checkout"
        /> */}

        <Block center>
          <Button textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
            style={styles.button}
            onPress={() => props.navigation.navigate('Checkout')}
          >
            CHECKOUT
          </Button>
        </Block>
        <Block flex row style={{ marginTop: 2, marginVertical: 8, }}>
          <WebView source={{ uri: `${store.link}` }} />
        </Block>
      </Block>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  wrapper: {
    paddingBottom: 10
  }
})
