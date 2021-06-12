import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
// import PropTypes from "prop-types";
import { Block } from "galio-framework";

import nowUITheme from "../constants/Theme";

const { width } = Dimensions.get('screen');

const Img = (props) => {
  const { style, type } = props;

  // const colorStyle = color && nowUITheme.COLORS[color.toUpperCase()];
  const avatarPhoto =
  'https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';

  const imageStyle = [type, { ...style }];

  const getImageStyle = () => {
    if (type === "circle") {
      return [styles.round, styles.image]
    } if (type === "raised") {
      return [styles.raised, styles.image]
    }
    return []
  }

  return (
    <Block>
      <Image
        source={{ uri:  avatarPhoto}}
        style={[...getImageStyle(), ...imageStyle]}
      />
    </Block>
  );
}

// Img.propTypes = {
//   type: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.oneOf([
//       "circle",
//       "raised",
//       "circle-raised",
//     ])
//   ]),
//   source: PropTypes.string
// };

const styles = StyleSheet.create({
  quote: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    borderWidth: 1,
    padding: 20
  },
  image:{
    marginBottom: 10,
    marginLeft: 10,
  },
  round: {
    width: width - nowUITheme.SIZES.BASE * 12,
    height: width - nowUITheme.SIZES.BASE * 12,
    borderRadius: (width - nowUITheme.SIZES.BASE * 12)/2,
  },
  raised:{
    width: width - nowUITheme.SIZES.BASE * 12,
    height: width - nowUITheme.SIZES.BASE * 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

export default Img;
