import React from 'react';
import { useState ,useEffect} from 'react';
import {View, Text,Image, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech,Ndef} from 'react-native-nfc-manager';
import {MaterialCommunityIcons } from '@expo/vector-icons'
import Tag from './Tag'
// Pre-step, call this before any NFC operations
NfcManager.start();
export default function Splash() {
  const [text,setText] = useState("")
  const [isScanning,setIsScanning] = useState(false)
  const [isVisible, setIsVisible] = useState(true);
  const [tagRead,setTagRead] = useState(false)
  const [firstname,setFirstName] = useState()
  const [lastname,setLastName] = useState()
  const [bloodtype,setBloodType]  =useState()
  const [address,setAddress] = useState()
  const [allergies,setAllergies]  = useState()
  const [contact,setContact] = useState()
  const [contactphone,setContactPhone] = useState()
  const [dob,setDOB] = useState()
  const [publicKey,setPublicKey] = useState()
 const closeForm = ()=>{
    setTagRead(false)
 }

  useEffect(() => {
    // Toggle the visibility of the text every 1000 milliseconds (1 second)
    const intervalId = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  async function readNdef() {
    try {

      if(!isScanning)
      {
        setText("Approach Smart Tag")
        setIsScanning(true)
      }
       
      else{
          setIsScanning(false)   
          NfcManager.cancelTechnologyRequest();
          setText("")

      }
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      //console.warn('Tag found', tag);
     // console.warn(tag.ndefMessage.length)
      //console.warn(Ndef.util.bytesToString(tag.ndefMessage[1].payload))
      setFirstName(Ndef.util.bytesToString(tag.ndefMessage[0].payload))
      setLastName(Ndef.util.bytesToString(tag.ndefMessage[1].payload))
      setBloodType(Ndef.util.bytesToString(tag.ndefMessage[2].payload))
      setDOB(Ndef.util.bytesToString(tag.ndefMessage[3].payload))
      setAddress(Ndef.util.bytesToString(tag.ndefMessage[4].payload))
      setAllergies(Ndef.util.bytesToString(tag.ndefMessage[5].payload))
      setContact(Ndef.util.bytesToString(tag.ndefMessage[6].payload))
      setContactPhone(Ndef.util.bytesToString(tag.ndefMessage[7].payload))
      setPublicKey(Ndef.util.bytesToString(tag.ndefMessage[8].payload))

      setTagRead(true) 
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false)
      setText("")
    }
  }
  return (
    <View style={styles.container}>
     {!tagRead && <TouchableOpacity onPress={readNdef}>
       
        <Image
        source={require('../../assets/tap.png')}
        style={styles.image}
      />      
        <View style={styles.textContainer}>

{isVisible && <Text style={styles.text}>{text}</Text>}
</View>

      </TouchableOpacity>}
      {tagRead &&<Tag Close={closeForm} firstname={firstname} lastname={lastname} dob={dob} address={address} bloodtype={bloodtype} allergies={allergies} contact={contact} contactphone={contactphone} publickey={publicKey}/>}      
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
  color:"#FF0000",
  fontSize:22,
  textAlign:"center"
  }, image: {
    width: 300,
    height: 200,
  },
  textContainer: {
    height: 50 // Fixed height to reserve space for the blinking text
  }
});
