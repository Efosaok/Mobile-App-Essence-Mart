import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Form (props) {
  return (
    <View style={styles.formSection}>
      {props.isRegistration && 
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
            Email
        </Text>
        <View style={styles.inputWrapper}>
            <MaterialCommunityIcons style={styles.inputIcons} name="email-outline" size={24} color="black" />
            <TextInput
            style={styles.inputField}
            placeholder="mraldada.work@gmail.com"
            value={props.email}
            onChangeText={(val) => props.updateInputVal(val, 'email')}
            />
        </View>  
      </View>}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
            Username
        </Text>
        <View style={styles.inputWrapper}>
            <FontAwesome5 style={styles.inputIcons} name="user" size={24} color="black" />
            <TextInput
            style={styles.inputField}
            placeholder="mraldada"
            value={props.username}
            onChangeText={(val) => props.updateInputVal(val, 'username')}
            />
        </View>  
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
            Password
        </Text>
        <View style={styles.inputWrapper}>
            <Ionicons style={styles.inputIcons} name="lock-closed-outline" size={24} color="black" />
            <TextInput
            style={styles.inputField}
            placeholder="mraldada"
            secureTextEntry={true}
            value={props.password}
            onChangeText={(val) => props.updateInputVal(val, 'password')}
            />
        </View>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
    marginVertical: 15,
    marginTop: 25
    // flex: 1,
  },
  inputGroup: {
    paddingVertical: 10
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700'
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    alignItems: 'center',
    padding: 3
  },
  inputField: {
    color: '#808080',
    flex: 2
  },
  inputIcons: {
    color: '#808080',
    padding: 10
  },
});