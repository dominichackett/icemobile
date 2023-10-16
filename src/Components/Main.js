import React from 'react';
import { useState ,useEffect} from 'react';
import {View, Text,Image, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech,Ndef} from 'react-native-nfc-manager';
import {MaterialCommunityIcons } from '@expo/vector-icons'
import { useToast } from "react-native-toast-notifications";
import  { PushAPI} from "@pushprotocol/restapi";
import {ENV} from "@pushprotocol/restapi/src/lib/constants"
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

import * as ethers from "ethers";
import Tag from './Tag'
import { formatString } from '../../utils';

import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts' 
import { goerli } from 'viem/chains'
// Pre-step, call this before any NFC operations
NfcManager.start();
export default function Splash({route}) {
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
  const toast = useToast()
  const {privateKey} = route.params

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
     if(tag.ndefMessage.length !=9)
     {
      toast.show("Error Not a Valid ICE Alert Card.", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 120,
        animationType: "slide-in",
      });
      return

}
     
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
 //const recipient = new ethers.Wallet(privateKey)
 //const provider = ethers.getDefaultProvider("goerli");
       // const provider = new ethers.providers.InfuraProvider("goerli","1627072ef1944debb4daefbb326adb7e")
   //    const wallet = new ethers.Wallet("0xf39811dc2e638e6bd653d182758298fa2b97ebc19eb13709fd99bed46083f653") 
  //const signer = wallet.connect(provider)
//const signer = await wallet.connect(provider);
// Replace 'wss://ethereum-goerli.publicnode.com' with the WebSocket URL of the Ethereum network you want to use
const rpcURL = 'wss://ethereum-goerli.publicnode.com';

//const web3 = new Web3(new Web3.providers.WebsocketProvider(rpcURL));

// Create a wallet using the provided private key
//const wallet = web3.eth.accounts.privateKeyToAccount("0xf39811dc2e638e6bd653d182758298fa2b97ebc19eb13709fd99bed46083f653");
const providerUrl = "https://rpc.ankr.com/eth"; // Or your desired provider url
const provider = ethers.getDefaultProvider(rpcURL);

const wallet = new ethers.Wallet(privateKey,provider) 

//console.log('Address:',await wallet.getChainId());
//console.log('Private Key:',await wallet.getAddress());
//onsole.log("provider:" ,wallet.provider)
const env = ENV.STAGING
//const user =  new PushAPI(wallet)
//console.log (user)
//console.log(wallet)
const encoder = new TextEncoder();

// Encode a JavaScript string into a Uint8Array
const text = "Hello, world!";
const encodedData = encoder.encode(text);

// The encodedData is now a Uint8Array containing the UTF-8 encoded text
console.log(encodedData); // This will output the binary representation of the text

const user = await PushAPI.initialize(wallet,{env:env})
return
//console.log(user)
     console.log(PushAPI.payloads)
     const apiResponse = await PushAPI.payloads.sendNotification({
        signer:wallet,
        type: 3, // subset
        identityType: 2, // direct payload
        notification: {
          title: `Tag Scan: ${formatString(Ndef.util.bytesToString(tag.ndefMessage[0].payload))} ${formatString(Ndef.util.bytesToString(tag.ndefMessage[1].payload))} `,
          body: `notification BODY`
        },
        payload: {
          title: `Tag Scan: ${formatString(Ndef.util.bytesToString(tag.ndefMessage[0].payload))} ${formatString(Ndef.util.bytesToString(tag.ndefMessage[1].payload))} `,
          body: `notification BODY`,
          cta: '',
          img: ''
        },
        recipients: [`eip155:5:${formatString(Ndef.util.bytesToString(tag.ndefMessage[8].payload))}`], // recipients addresses
        channel: 'eip155:5:0x5858769800844ab75397775Ca2Fa87B270F7FbBe', // your channel address
        env: ENV.staging
      });

      console.log(apiResponse)
    //  const signer = await wallet.connect(provider)
     // wallet.provider = provider;
     // console.log(wallet.provider)
     // const env = ENV.STAGING
      //const x = await PushAPI.initialize(wallet,{env})
   //   return
      //console.warn(`Tag Scan: ${formatString(Ndef.util.bytesToString(tag.ndefMessage[0].payload))} ${formatString(Ndef.util.bytesToString(tag.ndefMessage[1].payload))} `)
      //console.warn(`eip155:5:${formatString(Ndef.util.bytesToString(tag.ndefMessage[8].payload))}`)
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
