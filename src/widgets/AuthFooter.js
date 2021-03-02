import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import firebase from '../database/firebaseDB';
import ToggleSwitch from 'toggle-switch-react-native'

export default function AuthFooter (props) {
  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.inputLabel}>
          Remember me
        </Text>
        <ToggleSwitch
          isOn={props.rememberMe}
          onColor="green"
          offColor="grey"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="medium"
          onToggle={props.onRememberMe}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '80%', alignSelf: 'center', marginTop: 20 }}>
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: 'grey'}}>Or</Text>
          </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 20, justifyContent: 'center' }}>
        <TouchableOpacity style={styles.btnPill}>
          <FontAwesome5 style={styles.btnIcons} name="facebook-f" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPill} activeOpacity={0.5}>
          {/* <Image  source={{ uri: 'https://res.cloudinary.com/deqt3envc/image/upload/c_scale,h_24/v1611832187/google-Logo.png'}} resizeMode="contain" style={{ flex: 1 }} /> */}
          <Ionicons style={styles.btnIcons} name="logo-google" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPill}>
          <AntDesign style={styles.btnIcons} name="apple1" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700'
  },
  btnPill: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 38,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  btnIcons: {
    display: 'flex',
    alignSelf: 'center'
  },
});