import React, { Fragment } from 'react';
import { Dimensions } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import { nowTheme } from '../../constants'

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - (width / 5));

const EmptyComponent = () => {
  const { goodsStyle } = styles;
  return (
    <>
      <Block flex column center style={goodsStyle}>
        <Icon name="ios-cart" size={thumbMeasure} style={{ marginRight: 8, color: "#DCDCDC" }} />
      </Block>
      <Block center>
        <Text style={{ color: nowTheme.COLORS.PRIMARY }}>Your cart is empty </Text>
      </Block>
    </>
  );
};

const styles = {
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};


export default EmptyComponent;
