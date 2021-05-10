import React, { useEffect, useState, Fragment } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Galio components
import { Block, Text } from 'galio-framework';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

// Now UI themed components
import { nowTheme } from '../constants';

import { Card } from '../components';
import { useCartContext } from '../context/CartContext';
import { getOrders } from '../shared/methods/Orders';
import { useUserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - (width / 5));

const DRAFT = (props) => {
  const { user } = useUserContext();
  const { setHistory, draft, setOrder } = useCartContext()
  const [isLoading, setLoading] = useState(false)
  const { navigation } = props;

  useEffect(() => {
    // let unsubscribe;
    const status = 'DRAFT';
    try {
      setLoading(true)
      getOrders(user.uid, status)
      .then((orders) => {
        const docs = orders.docs;
        const data = []
        docs.forEach((doc) => data.push(doc.data()))
        setHistory(JSON.parse(JSON.stringify(data)), status)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, '????????????>>>>>>>>>>')
        setLoading(false)
      })
    } catch (error) {
      console.log(error, '????????????>>>>>>>>>>')
      setLoading(false)
    }
    // return () => unsubscribe()
  }, [])

  const resolveNaming = (item) => (item && item.cart) || (item && item.carts)

  const timeResolver = (item) => {
    const {createdAt} = item // 1454521239279
    return createdAt && moment.unix(createdAt/1000).fromNow()
  }

  // TODO: Delete function, and store store title/name in the history
  const resolveTitle = (item) => {
    return (item && item.title) || 'Direct Store'
  }

  const getItem = (cartItem) => {
    const carts = resolveNaming(cartItem)
    const quantities = (cartItem && cartItem.quantities);
    const cartLength = (carts && carts.length);
    const cart = (carts && carts.find(cart => cart.imageUrl));

    const item = {
      quantities: quantities || cartLength,
      createdAt: timeResolver(cartItem),
      title: resolveTitle(cartItem),
      image: { uri: cart && cart.imageUrl }
    }

    return item
  }

  const getDetails = (detail, item) => {
    setOrder({ ...detail, ...item })
    navigation.navigate('TrackOrder', { screen: 'OrderInformation' })
  }

  return (
    <Block flex center>
      <Loader isLoading={isLoading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {draft && draft.map((cartHistory) => (
        <Card
          titleStyles={styles.titleStyles}
          item={getItem(cartHistory)}
          horizontal
          onPress={() => getDetails(cartHistory, getItem(cartHistory))}
          key={cartHistory.createdAt}
          style={{ maxHeight: 75, minHeight: 75 }}
          imgContainerFlex={0.34}
        />))}
        {!draft && (
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

export default DRAFT;
