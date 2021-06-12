import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
// import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'galio-framework'

const Checkbox = (props) => {
  const { checked } = props
  const [state, setState] = useState({
    checked : checked || false
  });

  const onPress = () => {
    setState((prevState) => ({ ...prevState, checked: !prevState.checked }));
  }

  const { iconColor, textStyle, label, id, } = props;
  const { checked: isChecked } =  state;

  return (
    <TouchableWithoutFeedback
      key={id}
      onPress={onPress}
    >
      <View
        style={styles.checkboxContainer}
      >
        <Icon
          name={isChecked ? 'md-checkbox' : 'ios-square-outline'}
          size={20}
          color={iconColor}
        />
        <View
          style={{ marginLeft: 5 }}
        >
          <Text style={{...textStyle}}>{label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Checkbox.propTypes = {
//   id: PropTypes.string,
//   label: PropTypes.string,
//   iconColor: PropTypes.string,
//   checked: PropTypes.bool,
//   onChecked: PropTypes.func,
// };

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection:  'row' ,
    alignItems: 'center'
  },
});

export default Checkbox
