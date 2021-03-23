import React, { useState, Fragment } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { useStoreListContext } from '../context/StoreListContext';

import articles from "../constants/categories";
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
      <Icon
        family="NowExtra"
        size={16}
        name={props.icon}
        color={nowTheme.COLORS.ICON}
      />
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

const { categories, subCategories } = articles;

export default function Home ({ navigation }) {
  const [state, setState] = useState('');
  const [shopCategories, setShopCategories] = useState({})
  const { setStoreSection } = useStoreListContext()

  const handlePress = (text) => {
    console.log('text')
    if(text && subCategories[text]) {
      setState(prev => prev === text ? '' : text)
      setShopCategories({ category: text, items: subCategories[text] })
    } else {
      setStoreSection({ ...shopCategories, current: text })
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
          {categories.map(category => (
            <Fragment key={category.text}>
              <Category
                onPress={() => handlePress(category.text)}
                text={category.text}
                icon={category.icon}
                active={state === category.text}
              />
              {(state === category.text && subCategories[state]) ? 
              subCategories[state].map(subCategory => (
                <Category
                  onPress={() => handlePress()}
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
  };

  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  }
});

// export default Home;
