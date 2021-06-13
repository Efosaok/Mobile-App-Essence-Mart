import React, { useEffect, useState } from 'react';
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
import { nowTheme } from '../../constants';

import { Card } from '../../components';
import { useCartContext } from '../../context/CartContext';
import { getOrders } from '../../shared/methods/Orders';
import { useUserContext } from '../../context/UserContext';
import Loader from '../../components/Loader';
import { SyntacticLoop, condition } from '../../shared/generics'
import logger from '../../config/logger'

const { width } = Dimensions.get('screen');
const cacheData = [];
// document count;
let docCount = 0;
let mounted = false;
const thumbMeasure = (width - (width / 5));

const DRAFT = (props) => {
  const { user, isAuthenticated } = useUserContext();
  // const { setOrders, draft, setOrder } = useCartContext()
  const { setOrder, setOrderCount } = useCartContext()
  const [isLoading, setLoading] = useState(false)
  const [draft, setOrders] = useState([])
  const { navigation } = props;

  useEffect(() => {
    const status = 'DRAFT';
    const clearCache = () => {
      cacheData.splice(0, cacheData.length)
      // document count;
      docCount = 0;
      setOrderCount(docCount, status)
      setOrders([ ...cacheData, ...draft])
    }

    if (!isAuthenticated) return clearCache(status);
    try {
      setLoading(true)
      getOrders(user.uid, status)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            logger.info('DRAFT:: change.doc.id', change.doc.id)
            docCount += 1;
            const item = { ...change.doc.data(), id: change.doc.id }
            if (!mounted) cacheData.push(item);
            else cacheData.unshift(item);
          }
          if (change.type === 'modified') {
            logger.info('DRAFT:: Modified change.doc.id', change.doc.id)
            const item = { ...change.doc.data(), id: change.doc.id }
            const dCondition = condition(cacheData, 'uid', 'equals', item.id)
            // eslint-disable-next-line no-return-assign
            SyntacticLoop(dCondition, (index) => cacheData[index] = item)
          }
          if (change.type === 'removed') {
            logger.info('DRAFT:: Removed change.doc.id', change.doc.id)
            docCount -= 1;
            const item = { ...change.doc.data(), id: change.doc.id }
            const dCondition = condition(cacheData, 'uid', 'equals', item.id)
            SyntacticLoop(dCondition, (index) => cacheData.splice(index, 1))
          }
        });
        mounted = true
        setLoading(false)
        setOrders([ ...cacheData, ...draft])
      }, (error) => {
        setLoading(false)
        logger.error('Draft:: FIRST Catch ERROR', error)
      })
    } catch (error) {
      logger.error('Draft:: LAST Catch ERROR', error)
      setLoading(false)
    }
  }, [draft, isAuthenticated, setOrderCount, user.uid])

  const resolveNaming = (item) => (item && item.cart) || (item && item.carts)

  const timeResolver = (item) => {
    const {createdAt} = item // 1454521239279
    return createdAt && moment.unix(createdAt/1000).fromNow()
  }

  // TODO: Delete function, and store store title/name in the history
  const resolveTitle = (item) => (item && item.title) || 'Direct Store'

  const getItem = (cartItem) => {
    const carts = resolveNaming(cartItem)
    const quantities = (cartItem && cartItem.quantities);
    const cartLength = (carts && carts.length);
    const cart = (carts && carts.find(eachCart => eachCart.imageUrl));

    const item = {
      quantities: quantities || cartLength,
      createdAt: timeResolver(cartItem),
      title: resolveTitle(cartItem),
      image: { uri: cart && cart.imageUrl }
    }

    return item
  }

  const getDetails = (detail, item) => {
    setLoading(true)
    setOrder({ ...detail, ...item })
    setLoading(false)
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
        {(!draft || !draft.length) && (
        <>
          <Block flex column center style={styles.goodsStyle}>
            <Icon name="ios-clipboard-outline" size={thumbMeasure} style={{ color: "#DCDCDC", }} />
          </Block>
          <Block center>
            <Text style={{ color: nowTheme.COLORS.PRIMARY }}>Here is clear </Text>
          </Block>
        </>)}
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
