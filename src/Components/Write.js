import React from 'react';
import { useState,useEffect } from 'react';
import {View,ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, Button} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup'
import "react-native-get-random-values"

import "@ethersproject/shims"

import {ethers} from 'ethers'
import { useToast } from "react-native-toast-notifications";


const emergencySchema = Yup.object().shape({
    firstname:Yup.string().required("First name is required"),
    lastname:Yup.string().required("Last name is required"),
    address:Yup.string().required("Address is required"),
    allergies:Yup.string().required("Allergies is required"),
    contact:Yup.string().required("Contact name is required"),
    contactphone:Yup.string().required("Contact phone is required")
})
NfcManager.start();export default function Write({route}) {
  const [text,setText] = useState("ICE ALERTS")
  const [selectedBloodType, setSelectedBloodType] = useState('A+');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [buttonColor,setButtonColor] = useState("green")
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const {privateKey} = route.params
  const [wallet,setWallet] = useState()
  const toast = useToast()
 
  useEffect(()=>{
     const _wallet = new ethers.Wallet(privateKey)
     setWallet(_wallet)

  },[])
  async function writeNdef(values) {
    let result = false;
    setButtonColor('red')
  
    try {
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);
  
      const bytes = Ndef.encodeMessage([Ndef.textRecord(`First Name:${values.firstname}`),Ndef.textRecord(`Last Name:${values.lastname}`)
        ,Ndef.textRecord(`Blood:${selectedBloodType}`),Ndef.textRecord(`DOB:${selectedDate.toDateString()}`)
        ,Ndef.textRecord(`Address:${values.address}`),Ndef.textRecord(`Allergies:${values.allergies}`),Ndef.textRecord(`Contact:${values.contact}`),Ndef.textRecord(`Phone:${values.contactphone}`)
        ,Ndef.textRecord(`Public Key:${wallet.address}`)]);
  
        console.log(bytes.length)
        if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
        setButtonColor('green')
      }
    } catch (ex) {
      toast.show("Error Writing Data to NFC Tag", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 120,
        animationType: "slide-in",
      });
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
      setButtonColor('green')
    }
  
    return result;
  }
 
  
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView >
    
      <Formik initialValues={{firstname:'',lastname:'',address:'',allergies:'',info:'',contact:'',contactphone:'',dob:selectedDate.toDateString()}} onSubmit={(values)=>{writeNdef(values)}}
             validationSchema={emergencySchema}
             >
        {(props)=>(<View style={styles.container}> 
            <TextInput style={styles.input} placeholder='First Name' onChangeText={props.handleChange('firstname')} 
        value={props.values.firstname}/>
                {props.errors.firstname && props.touched.firstname ?    <Text style={styles.errorText}>{props.errors.firstname}</Text>:null}

         <TextInput style={styles.input}  placeholder='Last Name' onChangeText={props.handleChange('lastname')} 
        value={props.values.lastname}/>
        {props.errors.lastname && props.touched.lastname ?    <Text style={styles.errorText}>{props.errors.lastname}</Text>:null}

         <Text style={styles.bloodTypeText}>Select your blood type:</Text>
      <Picker
        style={styles.input}
        selectedValue={selectedBloodType}
        onValueChange={(itemValue) => setSelectedBloodType(itemValue)}
      >
        {bloodTypes.map((bloodType) => (
          <Picker.Item key={bloodType} label={bloodType} value={bloodType} />
        ))}
      </Picker>
      <Button title="Select Date of Birth" onPress={showDatepicker} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
 onChange={(event, date) => {
            setShowDatePicker(false); // Close the date picker
            if (date) {
              props.setFieldValue('dob', date.toDateString()); // Update Formik field
            }
          }}        />
      )}
             <Text style={styles.dobText}>{props.values.dob}</Text>
             <TextInput style={styles.input}  placeholder='Address' onChangeText={props.handleChange('address')} />
             {props.errors.address && props.touched.address ?    <Text style={styles.errorText}>{props.errors.address}</Text>:null}

             <TextInput style={styles.input}  placeholder='Allergies' onChangeText={props.handleChange('allergies')} />
             {props.errors.allergies && props.touched.allergies ?    <Text style={styles.errorText}>{props.errors.allergies}</Text>:null}

             <Text style={styles.headerText}>Emergency Contact</Text>
             <TextInput style={styles.input}  placeholder='Emergency Contact' onChangeText={props.handleChange('contact')} />
             {props.errors.contact && props.touched.contact ?    <Text style={styles.errorText}>{props.errors.contact}</Text>:null}

             <TextInput style={styles.input}  placeholder='Contact Phone' onChangeText={props.handleChange('contactphone')} />
             {props.errors.contactphone && props.touched.contactphone ?    <Text style={styles.errorText}>{props.errors.contactphone}</Text>:null}
 
          
   <Button color={buttonColor} onPress={props.handleSubmit} title='Register Tag'/>
        </View>)}
        </Formik>
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

    }

});
