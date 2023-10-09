import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import "react-native-get-random-values"

import "@ethersproject/shims"

import {ethers,isAddress} from 'ethers'
import { useToast } from "react-native-toast-notifications";

export default function Contacts() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();
  const [address,setAddress] = useState()
  const [validAddress,setValidAddress] = useState(false)
  const toast = useToast()
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  const resetScanner = ()=>{
     setScanned(false)
     setAddress(null)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(isAddress(data))
    {
        setAddress(data)
        setValidAddress(true)
        toast.show("Valid Ethereum Adresss Scanned", {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 120,
            animationType: "slide-in",
          });
    }
    else{
         setValidAddress(false)
         toast.show("Invalid Ethereum Adresss", {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 120,
            animationType: "slide-in",
          });
    } 
  };
useEffect(()=>{
    if (hasPermission === null) {
        toast.show("Checking Camera Permissions", {
            type: "warning",
            placement: "bottom",
            duration: 4000,
            offset: 120,
            animationType: "slide-in",
          });
      }
  
      if (hasPermission === false) {
        toast.show("Camera Access Denied", {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 120,
            animationType: "slide-in",
          });
      }
},[hasPermission])

  

  return (
    <View style={styles.container}>
      {(!scanned && isFocused) && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.image}
        />
      )}
{address &&     <Text style={styles.text}>{address}</Text>
}
{scanned && (
  <View style={styles.buttonContainer}>
    <Button title={'Scan Again'} onPress={() => resetScanner()} />
    {scanned && validAddress && (
      <View style={styles.buttonSpacing} />
    )}
    {scanned && validAddress && (
      <Button title={'Add Contact'} onPress={() => setScanned(false)} />
    )}
  </View>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    alignItems: 'center',  // Align buttons vertically in the center
  },
  buttonSpacing: {
    width: 10, // Adjust the spacing as needed
  },
  
  text:{
  color:"#000000",
  fontSize:14,
  fontWeight:"bold",
  
  marginTop:8,
  marginBottom:6
  }
});
