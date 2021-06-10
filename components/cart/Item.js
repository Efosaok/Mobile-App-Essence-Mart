import React from 'react';
import { FlatList, Image } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartContext } from '../../context/CartContext';

import nowTheme from "../../constants/Theme";

const buttnStyle = { borderRadius: 15, height: 30, width: 30, textAlign: 'center', borderColor: 'black', borderWidth: 1 }
const iconStyle = { marginLeft: -5, marginRight: -15, marginTop: -7, color: 'black' }
const currentPriceStyle = { color: '#2e2f30', fontFamily: 'montserrat-bold', fontSize: 12, }
const deleteStyle = { color: '#fff', fontFamily: 'montserrat-regular', fontSize: 12 }
const deleteBlockStyle = { marginLeft: 10, paddingHorizontal: 10, alignItems: 'center', marginTop: 3, borderRadius: 3, backgroundColor: nowTheme.COLORS.PRIMARY }
const descStyle = { color: '#2e2f30', fontFamily: 'montserrat-regular' }

const IndexedPrice = (item) => Number(item.price || 0);

const Item = (props) => {
  const { cart, removeItemInCart, increaseItemQuantity, decreaseItemQuantity } = useCartContext();
  const { carts, hasOrder } = props;

  const items = carts || cart;
  const renderItem = ({ item, index }) => {
    const removeItem = () => removeItemInCart(index)
    const decreaseItem = () => decreaseItemQuantity(index)
    const increaseItem = () => increaseItemQuantity(index)
    const source = { uri: item.imageUrl }
    const key = `${item.description}-${index}`
    const {
      containerStyle, 
      lastItemStyle,
      imageStyle, 
      textStyle, 
      counterStyle,
      priceStyle } = styles;
    const paddingTop = !hasOrder && index === 0 ? 50 : 10
    const itemStyles = { ...(items && (index + 1 === items.length) ? lastItemStyle : containerStyle), paddingTop }

    return (
    <Block key={key} style={itemStyles}>
      <Image source={source} style={imageStyle} />
      <Block style={textStyle}>
        <Text style={descStyle}>{item.description && item.description.split('\n').join(' ').trim()}</Text>
        <Block flex row>
          <Block style={priceStyle}>
            <Text style={currentPriceStyle}>{item.currency}{IndexedPrice(item)}</Text>
          </Block>
          {!hasOrder &&<Block center style={deleteBlockStyle}>
            <Text onPress={removeItem} style={deleteStyle}>Remove</Text>
          </Block>}
        </Block>
      </Block>

      {!hasOrder &&
      <Block style={counterStyle}>
        <Icon.Button 
          name="ios-remove" 
          size={25} 
          onPress={decreaseItem}
          color='#fff' 
          backgroundColor='#fff' 
          // style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30, textAlign: 'center' }}
          style={buttnStyle}
          iconStyle={iconStyle}
        />

        <Text>{item.quantity || 1}</Text>

        <Icon.Button
          name="ios-add" 
          size={25} 
          color='#fff'
          onPress={increaseItem}
          backgroundColor='#fff' 
          style={buttnStyle} 
          iconStyle={iconStyle}
        />

      </Block>}
    </Block>);
  }


  return (
    <FlatList
      data={items || []}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
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