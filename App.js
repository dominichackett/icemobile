import React from 'react';
import { useState ,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View,SafeAreaView ,StatusBar} from 'react-native';
import {Ionicons } from '@expo/vector-icons'
import Home from './src/Components/Home'
import Main from './src/Components/Main';
import Write from './src/Components/Write';
import Login from './src/Components/Login'
import Qrcode from './src/Components/Qrcode';
import Contacts from './src/Components/Contacts'
import Logout from './src/Components/Logout';
import {Feather,MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'
import { AppRegistry } from "react-native";
import "./globals.js";
import "react-native-get-random-values";
import { name as appName } from "./app.json";
AppRegistry.registerComponent(appName, () => App);
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
//import * as WebBrowser from 'expo-web-browser';
import * as WebBrowser from "@toruslabs/react-native-web-browser";
import EncryptedStorage from "react-native-encrypted-storage";
import { ToastProvider } from 'react-native-toast-notifications';
import Notifications from './src/Components/Notifications';
import * as PushAPI from "@pushprotocol/restapi";
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

import {ethers} from 'ethers'
import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator()



export default function App() {
  const [text,setText] = useState("ICE ALERTS")
  const authOptions = ['discord','email_passwordless','facebook','github', 'google', 'twitter'];
  const [selectedAuthOption,setSelectedAuthOption] = useState()
  const [isLoggedIn,setIsLoggedIn] = useState()
  const [privateKey,setPrivateKey] = useState()
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(()=>{
    if(requestUserPermission()){
      messaging().getToken().then((token)=>{
        console.log(token)
      })
    }
    messaging().getInitialNotification().then(remoteMessage=>{
        if(remoteMessage){
          console.log("Notification",remoteMessage.notification)
        }
     })

     messaging().onNotificationOpenedApp(remoteMessage=>{
       console.log(remoteMessage.notification)
     })
     messaging().setBackgroundMessageHandler(async (remoteMessage) =>{
       console.log("Background message",remoteMessage.notification)
     })

     const unsubscribe = messaging().onMessage(async (remoteMessage)=>{
      console.log(remoteMessage)
          alert(remoteMessage.notification.body)
     })
     return unsubscribe

  },[])
  const onLogout = async() => {
    await EncryptedStorage.setItem(
      "privateKey",null );
      setPrivateKey(null)
    setIsLoggedIn(false)
  };

  const doLogin = async(arg)=>{


   try { 


    await EncryptedStorage.setItem(
      "privateKey",arg  );

    setPrivateKey(arg)
    setIsLoggedIn(true)
    const _wallet = new ethers.Wallet(arg)
    const goerliProvider = ethers.getDefaultProvider("goerli");

    const signer = await _wallet.connect(goerliProvider)
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: 'eip155:5:0x5858769800844ab75397775Ca2Fa87B270F7FbBe', // channel address in CAIP
      userAddress: `eip155:5:${_wallet.address}`, // user address in CAIP
      onSuccess: () => {
       console.log('opt in success');
      },
      onError: () => {
        console.error('opt in error');
      },
      env: 'staging'
    })


  }catch(error)
  {
      console.error(error)
  }
   

  }
  useEffect(()=>{
    async function checkLogin(){
      try {   
        const key = await EncryptedStorage.getItem("privateKey");
        console.log(key)
        if (key !== undefined && key != null) {
            // Congrats! You've just retrieved your first value!
            setPrivateKey(key)
            setIsLoggedIn(true)
           }
    } catch (error) {
        // There was an error on the native side
    }
    }
    checkLogin()
  },[])
  
  return (
    
    <SafeAreaView style={styles.container}>
    {isLoggedIn && <NavigationContainer
      options={{
        headerRight: () => (
          <Home />
        ),
      }}>
      <ToastProvider>
      <Tab.Navigator  screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'red',    // Color for active tab
        tabBarInactiveTintColor: 'grey',  // Color for inactive tab
        tabBarStyle:{backgroundColor:'#303030'},headerRight: () => (
          <Logout onLogout={onLogout}/>
        )
      })}  >
        <Tab.Screen name={'Home'} component={Home} options={{  tabBarIcon:({focused})=> <Feather name={'home'} size={25} color={(focused ? "red":"white")} />}}/>
        <Tab.Screen initialParams={{privateKey:privateKey}} name ="Scan"  component={Main} options={{tabBarIcon:({focused})=> <MaterialCommunityIcons name="credit-card-scan" size={25}  color={(focused ? "red":"white")} />,headerTitle:'Scan Smart Tag'}}/>
        <Tab.Screen  initialParams={{privateKey:privateKey}} name="Register"  component={Write} options={{tabBarIcon:({focused})=> <AntDesign name="addfile" size={25}  color={(focused ? "red":"white")} />,headerTitle:'Register Tag'}}/>
        <Tab.Screen initialParams={{privateKey:privateKey}} name="Contacts" component={Contacts} options={{tabBarIcon:({focused})=> <AntDesign name={'contacts'} size={25} color={(focused ? "red":"white")} />,headerTitle:'+ Emergency Contacts'}}/>
        <Tab.Screen initialParams={{privateKey:privateKey}} name={'Notifications'} component={Notifications} options={{tabBarIcon:({focused})=> <Ionicons name={'notifications'} size={25} color={(focused ? "red":"white")} />}}/>

        <Tab.Screen initialParams={{privateKey:privateKey}} name={'Settings'} component={Qrcode} options={{tabBarIcon:({focused})=> <Feather name={'settings'} size={25} color={(focused ? "red":"white")} />}}/>

    
    </Tab.Navigator>
    </ToastProvider>
    </NavigationContainer>}
    { !isLoggedIn && <Login login={doLogin}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({container:{   flex:1,     marginTop:StatusBar.currentHeight
}})
