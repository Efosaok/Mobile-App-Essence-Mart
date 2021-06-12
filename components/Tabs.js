import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { Block, theme } from 'galio-framework';
import nowTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

// const defaultMenu = [
//   { id: 'music', title: 'Music', },
//   { id: 'beauty', title: 'Beauty', },
//   { id: 'fashion', title: 'Fashion', },
//   { id: 'motocycles', title: 'Motocycles', },
// ];

export default function Tabs (props) {
  const { initialIndex, onChange, data } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const menuRef = React.createRef();

  const [state, setState] = useState({
    active: null,
  });

  const selectMenu = useCallback(() => (id) => {
    setState({ active: id });

    menuRef.current.scrollToIndex({
      index: data.findIndex(item => item.id === id),
      viewPosition: 0.5
    });

    const animate = () => {
      // animatedValue.setValue(0.01);
  
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, // color not supported
      }).start()
    }
  
    animate();
    onChange(id)
  }, [menuRef, data, animatedValue, onChange])

  // static defaultProps = {
  //   data: defaultMenu,
  //   initialIndex: null,
  // }

  // state = {
  //   active: null,
  // }

  useEffect(() => {
    if (initialIndex) {
      selectMenu(initialIndex);
    }
  }, [initialIndex, selectMenu])

  const onScrollToIndexFailed = () => {
    menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5
    });
  }

  const renderItem = (item) => {
    const isActive = state.active === item.id;
    const getID = () => {
      selectMenu(item.id)
    }

    const textColor = animatedValue.interpolate({
      inputRange: [0.01, 1],
      outputRange: [nowTheme.COLORS.TEXT, isActive ? nowTheme.COLORS.WHITE : nowTheme.COLORS.SECONDARY],
      extrapolate: 'clamp',
    });

    const containerStyles = [
      styles.titleContainer,
      !isActive && { backgroundColor: nowTheme.COLORS.TABS },
      isActive && styles.containerShadow
    ];

    return (
      <Block style={containerStyles}>
        <Animated.Text
          style={[
            styles.menuTitle,
            { color: textColor },
            { fontFamily: 'montserrat-regular' },
          ]}
          onPress={getID}>
          {item.title}
        </Animated.Text>
      </Block>
    )
  }

  const renderMenu = () => (
    <FlatList
      {...props}
      data={data}
      horizontal
      ref={menuRef}
      extraData={state}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      onScrollToIndexFailed={onScrollToIndexFailed}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={styles.menu}
    />
  )

  return (
    <Block style={styles.container}>
      {renderMenu()}
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: nowTheme.COLORS.ACTIVE,
    borderRadius: 21,
    marginRight: 9,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: nowTheme.COLORS.MUTED
  },
});
