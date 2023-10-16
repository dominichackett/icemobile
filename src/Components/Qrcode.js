import React,{useEffect,useState} from 'react';
import {View,Text,ScrollView ,TouchableOpacity, StyleSheet,Image} from 'react-native';
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'; 
import QRCode from "react-qr-code";
import "react-native-get-random-values"

import "@ethersproject/shims"

import {ethers} from 'ethers'
import Clipboard from '@react-native-clipboard/clipboard';

export default function Qrcode({route}) {
    const {privateKey} = route.params
    const [wallet,setWallet] = useState()
    const copyToClipboard = () => {
        Clipboard.setString(wallet.address);
      };

    useEffect(()=>{
        const _wallet = new ethers.Wallet(privateKey)
        setWallet(_wallet)
   
     },[])
    return (
    
    <View style={styles.container}> 
   
   {wallet?.address && <TouchableOpacity onPress={copyToClipboard}>        
    <QRCode style={styles.image} value={wallet?.address} />
    </TouchableOpacity>}
    <Text style={styles.text}>{wallet?.address}</Text>

        </View>
      
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
   
    
   
    alignItems: 'center',
    justifyContent: 'center',
   
  
  },
  text:{
  color:"#000000",
  fontSize:14,
  
  marginTop:8
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
      marginLeft:4,
      backgroundColor:"red"
    }, item: {
       margin:20,
             },

});
