import React, { Fragment, memo } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Block, theme, Text } from "galio-framework";

import stores from "../constants/stores";
import { Icon } from "../components";
import nowTheme from "../constants/Theme";
import { useStoreListContext } from '../context/StoreListContext';

const { width } = Dimensions.get("screen");
const categoryContainerStyle = { marginTop: 10, marginVertical: 8, }
const categoryInnerContainerStyle = { marginRight: 5, borderColor: nowTheme.COLORS.BORDER_COLOR, borderWidth: 1 }
const categoryCaptionStyle = { fontFamily: 'montserrat-bold', fontWeight: '900', fontSize: 6, }
const categoryTextStyle = { fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}
const categoryDividerStyle = { borderColor: nowTheme.COLORS.BORDER_COLOR, width: '100%', borderWidth: StyleSheet.hairlineWidth, marginTop: 10 }
const categoryBtnStyle = { paddingLeft: 8, }

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

const Category = memo(({ isSecondary, onPress, caption, active, text }) => {
  const handPress = () => {
    onPress({ isSecondary, onPress, caption, active, text })
  }

  return (
    <Block flex row style={categoryContainerStyle}>
      <Block middle flex={0.5} style={categoryInnerContainerStyle}>
        <Text
            color={isSecondary ? nowTheme.COLORS.SECONDARY : nowTheme.COLORS.BLACK}
            style={categoryCaptionStyle}
        >
            {caption}
        </Text>
      </Block>
      <TouchableWithoutFeedback onPress={handPress}>
        <Block flex style={categoryBtnStyle}>
          <Block flex row space="between">
            <Text
              color={isSecondary ? nowTheme.COLORS.SECONDARY : nowTheme.COLORS.BLACK}
              style={categoryTextStyle}
            >
              {text}
            </Text>
            {!isSecondary && <CategoryIcon active={active} />}
          </Block>
          <Block
            style={categoryDividerStyle}
          />
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  )
})

export default function Stores ({ navigation }) {
  const { setActiveStore, } = useStoreListContext()

  const handlePress = (store) => {
    setActiveStore(store)
    navigation.navigate('Store')
  }

  const renderArticles = () => (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {stores.map((store) => (
            <Fragment key={`${store.title}-${stores.length}`}>
              <Category
                onPress={handlePress}
                text={store.title}
                caption={store.caption}
                icon={store.icon}
                // active={store.title === currentStore.text}
              />
            </Fragment>
          ))}
        </Block>
      </ScrollView>
    );

  return (
    <Block flex center style={styles.stores}>
      {renderArticles()}
    </Block>
  );
}

const styles = StyleSheet.create({
  stores: {
    width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  }
});

// export default Home;
