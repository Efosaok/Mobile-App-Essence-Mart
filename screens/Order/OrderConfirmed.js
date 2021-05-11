import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

// galio components
import {
  Text, Block, NavBar, Icon,
} from 'galio-framework';
import { Button } from '../../components';
import nowTheme from "../../constants/Theme";
import { Images } from '../../constants';
import { useCartContext } from '../../context/CartContext';

const { height, width } = Dimensions.get('window');

const thumbMeasure = (width - (width / 5));

const OrderConfirmed = (props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const { initailizeCartPayment } = useCartContext();

  useEffect(() => {
    initailizeCartPayment({ data: null })
  }, [])

  // TODO: clear cart on this screen or on Navigating to this screen
  return (
    <Block flex center space="around" style={styles.container}>
      <Block center flex={2}>
        <Block center style={{ marginBottom: nowTheme.SIZES.BASE * 2 }}>
          <Image
            source={Images.OrderConfirmed}
            style={{ marginBottom: nowTheme.SIZES.BASE * 2 }}
          />
          <Text h4 color={nowTheme.COLORS.BLACK}>
            Well done!
          </Text>
        </Block>
        <Text
          color={nowTheme.COLORS.BLACK}
          style={{ marginBottom: nowTheme.SIZES.BASE }}
        >
          <Text
            size={nowTheme.SIZES.FONT}
            bold
          >
            #{id || '45C23B'}&nbsp;
          </Text>
          <Text>
            is your order number
          </Text>
        </Text>
        <Text
          color={nowTheme.COLORS.INFO}
          onPress={() => navigation.navigate('TrackOrder', { screen: 'Order', params: { id: 'Ongoing' } })}
        >
          Track your order
        </Text>
      </Block>
      <Button size="large" color="info" round onPress={() => navigation.openDrawer()}>
        Continue Shopping
      </Button>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: nowTheme.SIZES.BASE * 0.3,
    paddingHorizontal: nowTheme.SIZES.BASE,
    backgroundColor: nowTheme.COLORS.WHITE,
    paddingTop: nowTheme.SIZES.BASE * 6,
    paddingBottom: height * 0.1,
  },
});

export default OrderConfirmed;
