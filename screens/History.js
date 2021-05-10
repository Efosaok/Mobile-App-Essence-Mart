import React, { Fragment, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground
} from 'react-native';

import Articles from '../screens/Articles';
// Galio components
import { Block, Text, theme } from 'galio-framework';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

// Now UI themed components
import { articles, nowTheme } from '../constants';

import { Card } from '../components';
import { useCartContext } from '../context/CartContext';
import { getOrders } from '../shared/methods/Orders';
import { useUserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - (width / 5));

const History = (props) => {
  const { user } = useUserContext();
  const { setHistory, histories } = useCartContext()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    try {
      setLoading(true)
      getOrders(user.uid)
      .then((orders) => {
        const docs = orders.docs;
        const data = []
        docs.forEach((doc) => data.push(doc.data()))
        setHistory(JSON.parse(JSON.stringify(data)))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log('err', err)
      })
    } catch (error) {
      setLoading(false)
      console.log('error -- useEffect', error)
    }
  }, [])

  const resolveNaming = (item) => (item && item.cart) || (item && item.carts)

  const timeResolver = (item) => {
    const {createdAt} = item // 1454521239279
    return createdAt && moment.unix(createdAt/1000).fromNow()
  }

  // TODO: Delete function, and store store title/name in the history
  const resolveTitle = (item) => {
    return (item && item.title) || 'Amazon UK'
  }

  const getItem = (cartItem) => {
    const carts = resolveNaming(cartItem)
    const quantities = (cartItem && cartItem.quantities);
    const cartLength = (carts && carts.length);
    const cart = (carts && carts.find(cart => cart.imageUrl));

    if (cart) Image.prefetch(cart.imageUrl);

    const item = {
      quantities: quantities || cartLength,
      createdAt: timeResolver(cartItem),
      title: resolveTitle(cartItem),
      image: { uri: cart && cart.imageUrl }
    }

    return item
  }

  return (
    <Block flex center>
      <Loader isLoading={isLoading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {histories && histories.map((cartHistory) => (
        <Card
          titleStyles={styles.titleStyles}
          item={getItem(cartHistory)}
          horizontal
          style={{ maxHeight: 75, minHeight: 75 }}
          imgContainerFlex={0.34}
        />))}
        {!histories && (
        <Fragment>
          <Block flex column center style={styles.goodsStyle}>
            <Icon name="ios-clipboard-outline" size={thumbMeasure} style={{ color: "#DCDCDC", }} />
          </Block>
          <Block center>
            <Text style={{ color: nowTheme.COLORS.PRIMARY }}>Here is clear </Text>
          </Block>
        </Fragment>)}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  titleStyles: {
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
    color: nowTheme.COLORS.HEADER
  },
  container: { paddingBottom: 30, width },
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default History;
