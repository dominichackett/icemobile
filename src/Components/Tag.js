import React from 'react';
import {View,Image,ScrollView, Text,  StyleSheet, TextInput, Button} from 'react-native';
import { formatString } from '../../utils';

export default function Tag(props) {
    return (
    <ScrollView >
     <Image
        source={require('../../assets/ICE2.png')}
        style={styles.image}
      />
    <View style={styles.container}> 
            <Text style={styles.input}>First Name: {formatString(props?.firstname)}</Text>
            <Text style={styles.input}>Last Name: {formatString(props?.lastname)}</Text>
            <Text style={styles.input}>DOB: {formatString(props?.dob)}</Text>

            <Text style={styles.input}>Blood Type: {formatString(props?.bloodtype)}</Text>
            <Text style={styles.input}>Address: {formatString(props?.address)}</Text>
            <Text style={styles.input}>Allergies: {formatString(props?.allergies)}</Text>
            <Text style={styles.input}>Emergency Contact: {formatString(props?.contact)}</Text>
            <Text style={styles.input}>Contact Phone: {formatString(props?.contactphone)}</Text>
            <Text style={styles.input}>Public Key: {formatString(props?.publickey)}</Text>

           
   <Button color='green' onPress={props.Close} title='Close'/>
        </View>
        </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  padding:20
 
    
   
  
  },
  text:{
  color:"#000000",
  fontSize:32
  },
  input:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:10,
    fontSize:18,
    borderRadius:6,
    marginBottom:4
  },

  headerText:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:14,
    textAlign:"center"

  },
  
  dobText:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:14,
    marginTop:4,
    textAlign:"center"
  },

  bloodTypeText:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:4,
    textAlign:"center"

  },
  errorText:{
    color:"red",
    fontSize:12,
    marginBottom:8

    },
    image: {
      marginTop:28,
      marginBottom:10,  
      width: 300,
      height: 80,
      marginLeft:4
    }

});
