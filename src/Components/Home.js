import React from 'react';
import { useState } from 'react';
import { StyleSheet,Image, Text, View,SafeAreaView ,StatusBar} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {Ionicons } from '@expo/vector-icons'
export default function Home() {
  const [text,setText] = useState("Smart Medical Tags")
  const authOptions = ['discord','email_passwordless','facebook','github', 'google', 'twitter'];
  const [selectedAuthOption,setSelectedAuthOption] = useState('google')
  return (
    <View style={styles.container} >
      <Image
        source={require('../../assets/ICE1.png')}
        style={styles.image}
      />
      <Text style={styles.text}>{text}</Text>
   
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    borderColor:"#000000",
    borderStyle:"solid",
    borderWidth:3,
    
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
  color:"#000000",
  fontSize:22  },
  image: {
    width: 300,
    height: 300,
  },
  input:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:10,
    fontSize:38,
    borderRadius:6,
    marginBottom:4,
    backgroundColor: "#fff", // Set a background color here
    width:300

  },
});
