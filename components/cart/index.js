import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme } from "galio-framework";
// import Header from './Header';
import ItemGroup from './ItemGroup';
// import BasketContainer from './Basket';
import Footer from './Footer';
import EmptyComponent from './EmptyComponent';
import { useCartContext } from '../../context/CartContext';

const { width } = Dimensions.get("screen");

const Cart = (props) => {
  const { cart } = useCartContext();

  const hasCart = cart && cart.length

  if (hasCart) {
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
    width,
  },
  articles: {
    paddingVertical: theme.SIZES.BASE * 2,
    fontFamily: 'montserrat-regular'
  }
});

export default Cart;
