import React, { useEffect, useState, Fragment } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Block, theme, Text } from "galio-framework";

import stores from "../constants/stores";
import { Icon } from "../components";
import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");

const CategoryIcon = ({ active }) => {
  if (active) {
    return (
      <Icon
        family="NowExtra"
        size={16}
        name="minimal-down2x"
        color={nowTheme.COLORS.ICON}
      />
    )
  }
  return (
    <Icon
      family="NowExtra"
      size={16}
      name="minimal-right2x"
      color={nowTheme.COLORS.ICON}
    />
  )
}

const Category = (props) => {
  return (
    <Block flex row style={{ marginTop: 10, marginVertical: 8, }}>
      <Block middle flex={0.5} style={{ marginRight: 5, borderColor: nowTheme.COLORS.BORDER_COLOR, borderWidth: 1 }}>
        <Text
            color={props.isSecondary ? nowTheme.COLORS.SECONDARY : nowTheme.COLORS.BLACK}
            style={{ fontFamily: 'montserrat-bold', fontWeight: '900', fontSize: 6, }}
        >
            {props.caption}
        </Text>
      </Block>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <Block flex style={{ paddingLeft: 8, }}>
          <Block flex row space="between">
            <Text
              color={props.isSecondary ? nowTheme.COLORS.SECONDARY : nowTheme.COLORS.BLACK}
              style={{ fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
            >
              {props.text}
            </Text>
            {!props.isSecondary && <CategoryIcon active={props.active} />}
          </Block>
          <Block
            style={{ borderColor: nowTheme.COLORS.BORDER_COLOR, width: '100%', borderWidth: StyleSheet.hairlineWidth, marginTop: 10 }}
          />
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  )
}

export default function Stores ({ navigation }) {
  const [state, setState] = useState('');

  useEffect(() => {
    console.log('state', state)
  }, [state])

  const handlePress = (text) => {
    if(text && subCategories[text]) {
      setState(prev => prev === text ? '' : text)
    } else {
      navigation.navigate('Stores')
    }
  }

  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {stores.map(store => (
            <Fragment key={store.title}>
              <Category
                onPress={() => handlePress(store.title)}
                text={store.title}
                caption={store.caption}
                icon={store.icon}
                active={state === store.title}
              />
            </Fragment>
          ))}
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.stores}>
      {renderArticles()}
    </Block>
  );
}

const styles = StyleSheet.create({
  stores: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

// export default Home;
