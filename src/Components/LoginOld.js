import React from 'react';
import {View,Text,ScrollView ,TouchableOpacity, StyleSheet,Image} from 'react-native';
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'; 
const iconSize = 104
export default function Login(props) {
    function doLogin(arg)
    {
         if(props.login)
         { 
            props.login(arg)
         }
    }
    return (
    <ScrollView >
     <Text style={styles.text}>Login With</Text>
    <View style={styles.container}> 
    <TouchableOpacity onPress={()=> doLogin("discord")}>        
    <FontAwesome5 name="discord" size={iconSize} color="#5865F2" style={styles.item} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>doLogin("email_passwordless")}>        
   
    <MaterialIcons name="email" style={styles.item} size={iconSize} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>doLogin("facebook")}>        
   
    <FontAwesome5 name="facebook-square" size={iconSize} color="#1877F2" style={styles.item}/>
   </TouchableOpacity>
   <TouchableOpacity onPress={()=>doLogin("github")}>        
   
    <FontAwesome5 name="github-square" size={iconSize} color="black" style={styles.item}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>doLogin("google")}>        
   
    <FontAwesome5 name="google-plus-square" size={iconSize} color="#DB4437" style={styles.item}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>doLogin("twitter")}>        
   
    <FontAwesome5 name="twitter-square" size={iconSize} color="#1DA1F2" style={styles.item}/>
    </TouchableOpacity>

    <Image
        source={require('../../assets/ICE1.png')}
        style={styles.image}
      />
        </View>
      
        </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Arrange items horizontally
    flexWrap: 'wrap',     // Wrap items to the next row
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
   
  
  },
  text:{
  color:"#000000",
  fontSize:32,
  fontWeight:"bold",
  alignItems:"center",
  textAlign:"center",
  marginTop:30
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
      marginTop:18,
      marginBottom:10,  
      width: 190,
      height: 190,
      marginLeft:4
    }, item: {
       margin:20,
             },

});
