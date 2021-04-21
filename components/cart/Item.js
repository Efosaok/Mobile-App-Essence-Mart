import React from 'react';
import { FlatList, Image } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartContext } from '../../context/CartContext';

import nowTheme from "../../constants/Theme";


const IndexedPrice = (item) => Number(item.price || 0);

const Item = () => {
  const { cart, removeItemInCart, increaseItemQuantity, decreaseItemQuantity } = useCartContext();
  const _renderItem = ({ item, index }) => {
    const {
      containerStyle, 
      lastItemStyle,
      imageStyle, 
      textStyle, 
      counterStyle,
      priceStyle } = styles;

    return (
    <Block style={{ ...(cart && (index + 1 === cart.length)) ? lastItemStyle : containerStyle, paddingTop: index == 0 ? 50 : 10 }}>
      <Image source={{ uri: item.imageUrl }} style={imageStyle} />
      <Block style={textStyle}>
        <Text style={{ color: '#2e2f30', fontFamily: 'montserrat-regular' }}>{item.description && item.description.split('\n').join(' ').trim()}</Text>
        <Block flex row>
          <Block style={priceStyle}>
            <Text style={{ color: '#2e2f30', fontFamily: 'montserrat-bold', fontSize: 12, }}>{item.currency}{IndexedPrice(item)}</Text>
          </Block>
          <Block center style={{ marginLeft: 10, paddingHorizontal: 10, alignItems: 'center', marginTop: 3, borderRadius: 3, backgroundColor: nowTheme.COLORS.PRIMARY }}>
            <Text onPress={() => removeItemInCart(index)} style={{ color: '#fff', fontFamily: 'montserrat-regular', fontSize: 12 }}>Remove</Text>
          </Block>
        </Block>
      </Block>

      <Block style={counterStyle}>
        <Icon.Button 
          name="ios-remove" 
          size={25} 
          onPress={() => decreaseItemQuantity(index)}
          color='#fff' 
          backgroundColor='#fff' 
          // style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30, textAlign: 'center' }}
          style={{ borderRadius: 15, height: 30, width: 30, textAlign: 'center', borderColor: 'black', borderWidth: 1 }}
          iconStyle={{ marginLeft: -5, marginRight: -15, marginTop: -7, color: 'black' }}
        />

        <Text>{item.quantity || 1}</Text>

        <Icon.Button
          name="ios-add" 
          size={25} 
          color='#fff' 
          onPress={() => increaseItemQuantity(index)}
          backgroundColor='#fff' 
          style={{ borderRadius: 15, height: 30, width: 30, textAlign: 'center', borderColor: 'black', borderWidth: 1 }} 
          iconStyle={{ marginLeft: -5, marginRight: -15, marginTop: -7, color: 'black' }}
        />

      </Block>
    </Block>);
  }


  return (
    <FlatList
      data={cart || []}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index}
    />
  );
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 50, 
    height: 50, 
    marginRight: 20
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center'
  },
  priceStyle: {
    // backgroundColor: '#ddd',
    // width: 40,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
};

export default Item;