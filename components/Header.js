import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import nowTheme from '../constants/Theme';
import firebase from '../shared/firebase'
import { updateUser } from '../shared/methods/Users';
import { useProfileContext } from '../context/ProfileContext';
import { useUserContext } from '../context/UserContext';
import { useCartContext } from '../context/CartContext';
import { createOrder } from '../shared/methods/Orders';
import { useStoreListContext } from '../context/StoreListContext';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896 || height === 926);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {}}
  >
    <Icon
      family="NowExtra"
      size={16}
      name="bulb"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={[styles.notify, { backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY'] }]} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation, name, size, onPress }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => {}}>
    <Icon
      family="NowExtra"
      size={size || 16}
      name={name || "basket2x"}
      onPress={() => onPress ? onPress() : navigation.navigate('Shopping', { screen: 'Cart' })}
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const Quantity = (item) => Number(item.quantity || 1)
const Price = (item) => Number(item.price || 0);

const Header = (props) => {
  const { profile, setProfileError, setProfileLoading, setLoadingMessage } = useProfileContext();
  const { user, updateUser: updateUserState, isAuthenticated } = useUserContext();
  const { cart, clearCart } = useCartContext()
  const { store } = useStoreListContext()
  const items = cart && cart.map((item) => Quantity(item) * Price(item));
  const quantites = items && items.reduce((prev, item) => Quantity(item) + prev, 0);

  const { route } = props;
  const params = route && route.params
  const id = params && params.id;
  const isDraft = params && params.isDraft;

  const handleLeftPress = () => {
    const { back, navigation } = props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  const saveCart = () => {
    createOrder(cart, user, store, quantites, 'DRAFT').then((snapshot) => {
      console.log('snapshot.id', snapshot.id)
      clearCart()
      props.navigation.navigate('TrackOrder', { screen: 'Order', params: { id: 'Draft' } })
    })
  }

  const renderRight = () => {
    const { white, title, navigation } = props;
    

    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <BasketButton key="basket-title" navigation={navigation} isWhite={white} />
      ];
    }

    switch (title) {
      case 'Home':
        return [
          <BellButton key="chat-home" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        ];
      case 'Deals':
        return [
          <BellButton key="chat-deals" navigation={navigation} />,
          <BasketButton key="basket-deals" navigation={navigation} />
        ];
      case 'Stores':
        return [
          <BellButton key="chat-categories" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-categories" navigation={navigation} isWhite={white} />
        ];
      case 'Category':
        return [
          <BellButton key="chat-category" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-category" navigation={navigation} isWhite={white} />
        ];
      case 'Profile':
        return [
          <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        ];
      case 'Shopping Cart': {
        const hasCart = cart && cart.length
        const existed = (isDraft || id)
        console.log('existed', existed)
        return [
          // <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          (!existed && hasCart && isAuthenticated) && <Text onPress={saveCart} bold color={nowTheme.COLORS.PRIMARY}>Save</Text>
        ];
      }
      case 'Edit Profile': {
        const updateProfile = () => {
          try {
            const { photoURL, displayName, phoneNumber } = profile
            if(profile.displayName === '') {
              setProfileError('Enter details to login!')
            } else {
              setProfileLoading(true)
              setLoadingMessage('Updating profile')
              firebase
              .auth()
              .currentUser
              .updateProfile({ photoURL, displayName, phoneNumber })
              .then((res) => {
                setLoadingMessage('Updating profile..')
                updateUser(profile, user)
                .then((res) => {
                  updateUserState({ photoURL, displayName, phoneNumber })
                  navigation.navigate('Profile', { screen: 'ViewProfile' })
                  setProfileError('')
                  setLoadingMessage('')
                  setProfileLoading(false)
                })
                .catch((err) => {
                  console.log('updateUser - error', err)
                  setLoadingMessage('')
                  setProfileError(error.message || error)
                  setProfileLoading(false)
                })
              })
              .catch(error => {
                console.log('error', error)
                setProfileError(error.message || error)
                setProfileLoading(false)
              })
            }
          } catch (error) {
            setProfileError(error.message || error)
          }
        }

        return [
          // <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          <BasketButton
            onPress={updateProfile}
            key="basket-deals"
            size={30}
            name="check-22x"
            navigation={navigation}
            isWhite={white}
          />
        ];
      }
      case 'Account':
        return [
          <BellButton key="chat-profile" navigation={navigation} />,
          <BasketButton key="basket-deals" navigation={navigation} />
        ];
      case 'Product':
        return [
          <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-product" navigation={navigation} isWhite={white} />
        ];
      case 'Search':
        return [
          <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      case 'Settings':
        return [
          <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      default:
        break;
    }
  };


  const renderLeft = () => {
    const { white, title, navigation } = props;

    if (title === 'Edit Profile') {
      return (
        <Icon
          name="simple-remove2x"
          family="NowExtra"
          size={30}
          onPress={() => navigation.navigate('Profile', { screen: 'ViewProfile' })}
          color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
        />
      );
    }

    return (
      <Icon
        name={back ? 'minimal-left2x' : 'align-left-22x'}
        family="NowExtra"
        size={16}
        onPress={handleLeftPress}
        color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
      />)
  }
  const renderSearch = () => {
    const { navigation } = props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        // onFocus={() => {Keyboard.dismiss();}}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" />
        }
      />
    );
  };
  const renderContext = () => {
    return (
      <Block row style={styles.options}>
        <Text
          color={nowTheme.COLORS.BLACK}
          style={{ fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
        >
          Categories
        </Text>
      </Block>
    )
  }
  const renderOptions = () => {
    const { navigation, optionLeft, optionRight } = props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => console.log({})}
        >
          <Block row middle>
            <Icon
              name="bulb"
              family="NowExtra"
              size={18}
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionLeft || 'Beauty'}
            </Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => {}}>
          <Block row middle>
            <Icon
              size={18}
              name="bag-162x"
              family="NowExtra"
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  const renderTabs = () => {
    const { tabs, tabIndex, navigation } = props;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex}
        onChange={id => navigation.setParams({ tabId: id })}
      />
    );
  };
  const renderHeader = () => {
    const { search, options, tabs, context } = props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {options ? renderOptions() : null}
          {tabs ? renderTabs() : null}
          {context ? renderContext() : null}
        </Block>
      );
    }
  };

  const {
    back,
    title,
    white,
    transparent,
    bgColor,
    iconColor,
    titleColor,
    navigation,
    ...rest
  } = props;

  const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    { paddingTop: 20 }
  ];

  function trunc(text) {
    const size = Math.floor(width / 16) + 4
    return text.length > size ? `${text.substr(0, size)}...` : text;
  }
  
  const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];
  const adjustProfileSpacing = title === 'Edit Profile' && { width: '90%' }

  return (
    <Block style={headerStyles}>
      <NavBar
        back={false}
        title={trunc(title)}
        numberOfLines={1}
        style={navbarStyles}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        left={renderLeft()}
        leftStyle={{ paddingVertical: 12, flex: 0.2 }}
        titleStyle={[
          styles.title,
          adjustProfileSpacing,
          { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
          titleColor && { color: titleColor }
        ]}
        {...rest}
      />
      {renderHeader()}
    </Block>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular'
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
});

export default withNavigation(Header);
