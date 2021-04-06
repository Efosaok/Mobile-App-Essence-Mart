import React, { Fragment } from 'react';
// import { Block, Text } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import { nowTheme } from '../../constants'

const EmptyComponent = () => {
  const { goodsStyle } = styles;
  return (
    <Fragment>
      <Block flex column center style={goodsStyle}>
        <Icon name="ios-cart" size={300} style={{ marginRight: 8, color: "#DCDCDC" }} />
      </Block>
      <Block center>
        <Text style={{ color: nowTheme.COLORS.PRIMARY }}>Your cart is empty </Text>
      </Block>
    </Fragment>
  );
};

const styles = {
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};


export default EmptyComponent;
