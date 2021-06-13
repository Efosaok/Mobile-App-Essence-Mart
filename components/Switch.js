import React from "react";
import { Switch, Platform } from "react-native";

import nowTheme from "../constants/Theme";

const trackColor = {
  true: "#d3d3d3",
  false: Platform.OS === "ios" ? "#d3d3d3" : "#333"
}

const MkSwitch = (props) => {
    const { value, ...rest } = props;

    const addThumbColor = () => {
      if (Platform.OS === "ios") {
        return nowTheme.COLORS.PRIMARY
      } if (Platform.OS === "android" && value) {
        return nowTheme.COLORS.SWITCH_ON
      }
      return nowTheme.COLORS.SWITCH_OFF;
    }

    const thumbColor = addThumbColor()

    return (
      <Switch
        value={value}
        thumbColor={[
          value === true
            ? thumbColor// nowTheme.COLORS.SWITCH_ON
            :'#ffffff'
        ]}
        ios_backgroundColor="#D8D8D8"
        trackColor={trackColor}
        {...rest}
      />
    );
  }


export default MkSwitch;
