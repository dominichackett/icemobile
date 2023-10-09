import React, { useState, useEffect } from 'react';
import {TextInput, Text, View, StyleSheet, Button,FlatList ,ScrollView,TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import "react-native-get-random-values"

import "@ethersproject/shims"

import {ethers,isAddress} from 'ethers'
import { useToast } from "react-native-toast-notifications";
import { AntDesign } from '@expo/vector-icons'; 
import * as Yup from 'yup'
import { Formik } from 'formik';
import { ConfirmDialog } from 'react-native-simple-dialogs';

const contactSchema = Yup.object().shape({
  name:Yup.string().required("Name is required"),
 
})
export default function Contacts() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();
  const [address,setAddress] = useState()
  const [validAddress,setValidAddress] = useState(false)
  const [contacts,setContacts] = useState([{name:'Dominic Hackett',address:"0x01231"},{name:'Wife',address:"0x01232"},{name:'Mother',address:"0x01233"},{name:'Father',address:"0x012322"},{name:'Mother-in-law',address:"0x012335"}])
  const [dialogVisible,setDialogVisible] = useState(false)
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

  const onDelete = async(item)=>{
    alert(item.name)
  }

  const saveContact = async(contact)=>{
      setDialogVisible(true)

  }

  return (
    <View style={styles.container}>
            <View style={styles.scannerSpace}>

      {(!scanned && isFocused) && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.image}
        />
      )}
      {(scanned ) &&( <Formik initialValues={{name:''}} onSubmit={(values)=>{saveContact(values)}}
             validationSchema={contactSchema}
             >
        {(props)=>(<View style={styles.container}> 
          {scanned && validAddress &&  <TextInput style={styles.input} placeholder='Contact Name' onChangeText={props.handleChange('name')} 
        value={props.values.name}/>}
        {props.errors.name && props.touched.name ?    <Text style={styles.errorText}>{props.errors.name}</Text>:null}
        {scanned && (
  <View style={styles.buttonContainer}>
    <Button title={'Scan Again'} onPress={() => resetScanner()} />
    {scanned && validAddress && (
      <View style={styles.buttonSpacing} />
    )}
    {scanned && validAddress && (
      <Button title={'Add Contact'} onPress={props.handleSubmit} />
    )}
  </View>
)}
        </View>)}
        </Formik>)}
       
      </View>
     
{address &&     <Text style={styles.text}>{address}</Text>
}

    <ScrollView>
    <FlatList data={contacts} 
      keyExtractor={(item)=>item.address}
      renderItem={({item})=>(
        <View style={styles.item}>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
          <TouchableOpacity onPress={() => onDelete(item) }>   
          <View style={styles.iconContainer}>
            <AntDesign name="delete" size={24} color="black" />
          </View>
          </TouchableOpacity>
        </View>
      )}
    />
    </ScrollView>
    <ConfirmDialog
    title="Confirm Dialog"
    message="Save Emergency Contact?"
    visible={dialogVisible}
    onTouchOutside={() => this.setState({dialogVisible: false})}
    positiveButton={{
        title: "YES",
        onPress: () => setDialogVisible(false)
    }}
    negativeButton={{
        title: "NO",
        onPress: () => setDialogVisible(false)
    }}
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
  image: {
    width: 250,
    height: 250,
   
 
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    alignItems: 'center',  // Align buttons vertically in the center
    marginBottom:8,
    marginTop:8
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
  },
  itemText:{    
    fontSize:24,
  },
  item:{
    marginTop:10,
    padding:10,
    width:350,
    marginHorizontal:1,
    backgroundColor:"lightblue",
    borderRadius: 8, // Adjust the border radius as needed
    borderWidth: 1,
    borderColor: 'black', // Use the color you want for the border
    flexDirection: 'row', // Arrange text and icon horizontally
    alignItems: 'center', // Align text and icon vertically
    justifyContent: 'space-between', // Add space between text and icon
    
  }, scannerSpace: {
    height: 250, // Adjust the height as needed to preserve space for BarCodeScanner
    marginTop:8,

  },itemContent: {
    flex: 1,
    // Add your styles for the text content here
  },
  errorText:{
    color:"red",
    fontSize:14,
    fontWeight:"bold",
    marginBottom:8,
   


    },input:{
      borderWidth:1,
      borderColor:"#000000",
      width:300,
      padding:10,
      fontSize:18,
      borderRadius:6,
      marginBottom:4
    }

});
