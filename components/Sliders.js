import React from "react";
import Slider from "@react-native-community/slider";
// import { StyleSheet } from "react-native";
// import PropTypes from "prop-types";
// import { Text, Block } from "galio-framework";

import nowUITheme from "../constants/Theme";

const NSlider = (props) => {
  // const [state, setState] = useState({
  //   value: 50
  // })

  // const quoteStyle = [
  //   { color: colorStyle },
  //   styles.quote,
  //   { borderColor: colorStyle },
  //   { ...style }
  // ];

  // const change = (value) => {
  //   setState(() => {
  //     return {
  //       value: parseFloat(value)
  //     };
  //   });
  // }
  

  const convertHexToRgb = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${  r  }, ${  g  }, ${  b  }, ${  alpha  })`;
    } 
    return `rgb(${  r  }, ${  g  }, ${  b  })`;
    
  }

  const { color, style, fontSize, children, source, ...rest } = props;

  const colorStyle = color && nowUITheme.COLORS[color.toUpperCase()];


  return (
    <Slider
      step={1}
      maximumValue={100}
      minimumTrackTintColor={convertHexToRgb(colorStyle, 0.2)}
      maximumTrackTintColor='#d3d3d3'
      thumbTintColor={colorStyle}
      value={50}
      {...rest}
      // onValueChange={this.change.bind(this)}
    />
  );
}

// NSlider.propTypes = {
//   color: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.oneOf([
//       "primary",
//       "secondary",
//       "info",
//       "error",
//       "success",
//       "warning"
//     ])
//   ]),
//   source: PropTypes.string
// };

// const styles = StyleSheet.create({
//   quote: {
//     fontFamily: "montserrat-regular",
//     fontSize: 20,
//     borderWidth: 1,
//     padding: 20
//   }
// });

export default NSlider;
