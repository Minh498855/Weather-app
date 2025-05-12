import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Login({ navigation }) {
  const [isClicked, setIsClicked] = useState(true);
  const eyeIcon = isClicked ? faEyeSlash : faEye; 
  const hidden = isClicked ? true : false; 
  
  const changeHidden = () => {
      setIsClicked(!isClicked);
  };

  const onButtonPress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.signinForm}>
        <Text style={styles.header}>Login</Text>

        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faUser} size={25} style={styles.icon} />
          <TextInput
            style={styles.formInput}
            placeholder='Email ID'
            placeholderTextColor="white"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} size={25} style={styles.icon}/>
          <TextInput 
            style={styles.formInput}
            secureTextEntry={hidden}
            placeholder='Password'
            placeholderTextColor="white"
          />
          <TouchableOpacity onPress={changeHidden} style={styles.eyeIcon}>
          <FontAwesomeIcon icon={eyeIcon} size={25} style={{color: 'white'}}/></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={onButtonPress} activeOpacity={0.7}>
          <Text style={styles.btn_text}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#302f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    fontSize: 85,
    color: "white",
    textAlign: "flex-start",

  },
  signinForm: {
    flex: 0.5,
    width: "85%",
    borderRadius: 10,
    padding: 25,
    borderWidth: 1,
    borderColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#302f2f',
    borderRadius: 5,
    width: "100%",
    height: 50,
    marginVertical: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,

  },
  formInput: {
    color: 'white',
    paddingVertical: 10, 
    marginLeft: 5,

  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 40,
  },
  btn_text: {
    fontSize: 18,
    color: "#302f2f",
  },
  icon: {
    marginLeft: 10,
    color: 'white',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, 
    color: 'white',
  },
});