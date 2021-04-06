import React from 'react';
import { Block, Text } from 'galio-framework';

const BasketComponent = () => {
  const { basketContainerStyle, bagsTextStyle, priceTextStyle } = styles;
  return (
    <Block flex style={basketContainerStyle}>
      <Text style={bagsTextStyle}>2 bags</Text>
      <Text style={priceTextStyle}>$1.50</Text>
    </Block>
  );
};

const styles = {
  basketContainerStyle: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: '#DCDCDC'
  },
  bagsTextStyle: {
    fontSize: 12,
    fontFamily: 'montserrat-regular'
  },
  priceTextStyle: {
    fontSize: 12,
    fontFamily: 'montserrat-regular'
  }, 
};

export default BasketComponent;