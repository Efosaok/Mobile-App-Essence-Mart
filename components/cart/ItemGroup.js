import React from 'react';
import { Dimensions } from 'react-native';
import { Block } from 'galio-framework';
import Item from './Item';

const { width, height } = Dimensions.get('screen');

const ItemGroup = (props) => {
  const { itemStyle, carts } = props
  const hasOrder = carts && carts.length
  return (
    <Block flex={hasOrder ? 1 : 3} style={[styles.containterStyle, itemStyle]}>
      <Item carts={carts} hasOrder={hasOrder} />
    </Block>
  );
}

const styles = {
  containterStyle: {
      
    // flex: 3,
    backgroundColor: '#DCDCDC',

    width,
    // height,
    padding: 0,
    zIndex: 1
  }
};

export default ItemGroup;