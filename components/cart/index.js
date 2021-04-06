import React, { Component, Fragment } from 'react';
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
// import Header from './Header';
import ItemGroup from './ItemGroup';
// import BasketContainer from './Basket';
import Footer from './Footer';
import EmptyComponent from './EmptyComponent';
import { useCartContext } from '../../context/CartContext';

const { width } = Dimensions.get("screen");

const Cart = (props) => {
  const { cart } = useCartContext();

  const isEmptyCart = cart && cart.length

  if (isEmptyCart) {
    return (
      <Block
        styles={{
          flex: 1,
          // justifyContent: 'flex-start',
          paddingVertical: 10,
          marginHorizontal: 5,}}
        // showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.articles}
      >
        {/* <Header /> */}
        <ItemGroup />
        {/* <BasketContainer /> */}
        <Footer handleClick={props.generateCartKey} />
      </Block>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      <EmptyComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stores: {
    width: width,
  },
  articles: {
    paddingVertical: theme.SIZES.BASE * 2,
    fontFamily: 'montserrat-regular'
  }
});

export default Cart;
