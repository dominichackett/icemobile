import React from 'react';
import {View,Button,Image, StyleSheet} from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { useState,useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ethers } from 'ethers';
const iconSize = 104
export default function Login(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const toast = useToast()
    const [scanned, setScanned] = useState(false);
    const [privateKey,setPrivateKey] = useState()

    function isValidPrivateKey(_privateKey) {
        try {
          const wallet = new ethers.Wallet(_privateKey);
        return true  
        } catch (error) {
          return false;
        }
      }
    const doLogin = ({ type, data }) => 
    {

        if(isValidPrivateKey(data))
         {
            setPrivateKey(data)
            setScanned(true)

         } 
         
          console.log(data)
         

 }


 const resetScanner = ()=>{
    setScanned(false)
    setPrivateKey(null)
 }


    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
    return (
        <View style={styles.container}>
   
    <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : doLogin}
      style={styles.image}
    />
          <View style={styles.buttonContainer}>
    <Button title={'Scan Again'} onPress={() => resetScanner()} />
    {scanned && privateKey && (
      <View style={styles.buttonSpacing} />
    )}
    {scanned && privateKey && (
      <Button title={'Login'} onPress={()=>props.login(privateKey)} />
    )}
  </View>
  <Image
        source={require('../../assets/ICE1.png')}
        style={styles.image}
      />

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      width: 250,
      height: 250,
      marginTop:12
     
   
    }, item: {
       margin:20,
             },
             buttonContainer: {
                flexDirection: 'row', // Arrange buttons horizontally
                alignItems: 'center',  // Align buttons vertically in the center
                marginBottom:8,
                marginTop:8
              }
              ,
              buttonSpacing: {
                width: 10, // Adjust the spacing as needed
              },
});
