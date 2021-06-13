import React, { useState, Fragment, memo } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { useNavigation } from '@react-navigation/native';

import { useStoreListContext } from '../context/StoreListContext';

import articles from "../constants/categories";
import { Icon } from "../components";
import nowTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");
const categoryStyle = { marginTop: 10, marginVertical: 8, }

const CategoryIcon = memo(({ active }) => {
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
})

const Category = memo((props) => {
  const { icon, onPress, isSecondary, text, active } = props
  const handlePress = () => {
    onPress(text)
  }
  return (
    <Block flex row style={categoryStyle}>
      <Icon
        family="NowExtra"
        size={16}
        name={icon}
        color={nowTheme.COLORS.ICON}
      />
      <TouchableWithoutFeedback onPress={handlePress}>
        <Block flex style={{ paddingLeft: 8, }}>
          <Block flex row space="between">
            <Text
              color={isSecondary ? nowTheme.COLORS.SECONDARY : nowTheme.COLORS.BLACK}
              style={{ fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
            >
              {text}
            </Text>
            {!isSecondary && <CategoryIcon active={active} />}
          </Block>
          <Block
            style={{ borderColor: nowTheme.COLORS.BORDER_COLOR, width: '100%', borderWidth: StyleSheet.hairlineWidth, marginTop: 10 }}
          />
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  )
})

const { categories, subCategories } = articles;

const Home = memo(() => {
  const [state, setState] = useState('');
  const [shopCategories, setShopCategories] = useState({})
  const { setStoreSection } = useStoreListContext()
  const navigation = useNavigation();

  const handlePress = (text) => {
    if(text && subCategories[text]) {
      setState(prev => prev === text ? '' : text)
      setShopCategories({ category: text, items: subCategories[text] })
    } else {
      setStoreSection({ ...shopCategories, current: text })
      navigation.navigate('Stores')
    }
  }

  const renderArticles = () => (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {categories.map(category => (
            <Fragment key={category.text}>
              <Category
                onPress={handlePress}
                text={category.text}
                icon={category.icon}
                active={state === category.text}
              />
              {(state === category.text && subCategories[state]) ? 
              subCategories[state].map(subCategory => (
                <Category
                  onPress={handlePress}
                  key={subCategory.text}
                  isSecondary={state === category.text}
                  text={subCategory.text}
                  icon={subCategory.icon}
                />
              )) : null}
            </Fragment>
          ))}
        </Block>
      </ScrollView>
    );

  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
})

const styles = StyleSheet.create({
  home: {
    width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  }
});

export default Home;
