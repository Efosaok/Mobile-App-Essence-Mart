import React from 'react';
// import { Block, Text } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartContext } from '../../context/CartContext';

const TotalComponent = () => {
  const { cart } = useCartContext()

  const Quantity = (item) => Number(item.quantity || 1)
  const getCurrency = (price, currency, num) => price.includes(currency) ? price.split(currency)[1] : (num || 0)
  const getPrice = (price) => getCurrency(price, '$', getCurrency(price, '£'))
  const IndexedPrice = (item) => Number((item.price && getPrice(item.price)) || 0);

  const items = cart && cart.map((item) => Quantity(item) * IndexedPrice(item));
  const total = items && items.reduce((prev, amt) => Number(amt) + prev, 0);
  const totalAmountInForiegnCurrency = total;
  // TODO: total amount in nigeria currency
  // TODO: Exchange Rate

  const quantites = items && items.reduce((prev, item) => Quantity(item) + prev, 0);

  const { containerStyle, goodsStyle, totalStyle, goodsInfo } = styles;
  return (
    <Block flex>
      <Block style={containerStyle}>
        <Block style={goodsStyle}>
          <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
          <Text>{quantites || 1} goods</Text>
        </Block>

        <Block style={totalStyle}>
          <Text>Total - </Text>
          <Text style={{ fontFamily: 'montserrat-bold' }}>${parseFloat(totalAmountInForiegnCurrency).toFixed(2) || 0}</Text>
        </Block>
      </Block>

      <Block style={goodsInfo}>
        <Text>Estimated Order Summary For Nigeria</Text>
      </Block>
      <Block style={goodsInfo}>
        <Text>After login, Order total may vary based on your shipping address</Text>
      </Block>
    </Block>
  );
};

const styles = {
  containerStyle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15
  },
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goodsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};


export default TotalComponent;
