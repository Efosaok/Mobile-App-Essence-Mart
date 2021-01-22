import React from 'react'
import { View, StyleSheet, Image, Text, Button } from 'react-native'
import strings from 'res/strings'
import palette from 'res/palette'
import images from 'res/images'
import ImageButton from 'library/components/ImageButton'
export default class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={images.placeholder} />
        <Text style={styles.heading}>{strings.onboarding.welcome.heading.toUpperCase()}</Text>
        <Text style={styles.text}>{strings.onboarding.welcome.text1}</Text>
        <Text style={styles.text}>{strings.onboarding.welcome.text2}</Text>
        <View style={styles.bottom}>
          <ImageButton
            style={styles.button}
            title={strings.onboarding.welcome.button} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    marginTop: 50
  },
  heading: {
    ...palette.heading, ...{
      marginTop: 40
    }
  },
  text: {
    ...palette.text, ...{
      marginHorizontal: 8,
      marginVertical: 10
    }
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
})