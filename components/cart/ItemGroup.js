import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Block } from 'galio-framework';
import Item from './Item';

const { width, height } = Dimensions.get('screen');

class ItemGroup extends Component {
  render() {
    return (
      <Block flex style={styles.containterStyle}>
        <Item />
      </Block>
    );
  }
}

const styles = {
  containterStyle: {
      
    flex: 3,
    backgroundColor: '#DCDCDC',

    width,
    height,
    padding: 0,
    zIndex: 1
  }
};

export default ItemGroup;