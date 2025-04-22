import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const onButtonPress = () => {
    navigation.navigate("Home");
  };
  
    return (
      <View style={styles.container}>
        <View style = {styles.signinForm}>
        <Text style={styles.header}>Weather App</Text>
  
  
          <Text style={styles.formLabel}>Username</Text>
          <TextInput style={styles.formInput} placeholder='example@gmail.com'/>
  
          <Text style={styles.formLabel}>Password</Text>
          <TextInput
            style={styles.formInput}
            secureTextEntry={true}
            placeholder='Enter your password'
          />
          <TouchableOpacity style={styles.button} onPress={onButtonPress} activeOpacity={0.7}><Text style={styles.btn_text}>Sign In</Text></TouchableOpacity>
          </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',

    }, 
    header: {
      fontSize: 55,
      color: "#f9b41c",
      marginTop: 20,
      marginBottom: 20,
      textAlign:"center",
    },
    signinForm: {
      flex: 0.5,
      width: "80%",
      backgroundColor: "#69367d",
      borderRadius: 10,
      padding: 20,
      position: "relative",
      top: -50,
    },
    formLabel: {
      flex:1,
      color: "#fcd45c",
      marginBottom: 10,
      fontSize:18,
    },
    formInput :{
      flex:1,
      backgroundColor: "white",
      color: 'black',
      borderRadius: 5,
      marginBottom: 20,
    },
    button: {
      flex:1,
      backgroundColor: "#fcd45c",
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      marginTop: 10,
    },
    btn_text: {
      fontSize: 18,
      color: "#333",
    },

  
  });