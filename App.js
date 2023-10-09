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
const Tab = createBottomTabNavigator()
const web3auth = new Web3Auth(WebBrowser, EncryptedStorage, {
  clientId:"BB-gReLXTf6JrTGqEsbDNabY0jPvHVnpNUVAX06zapsu6qBzRIWPgqerki2FUmLmh4aYZGPp0XkjC6ux0Vy-DsI",
  network: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET, // MAINNET, AQUA,  CYAN or TESTNET
});
export default function App() {
  const [text,setText] = useState("ICE ALERTS")
  const authOptions = ['discord','email_passwordless','facebook','github', 'google', 'twitter'];
  const [selectedAuthOption,setSelectedAuthOption] = useState()
  const [isLoggedIn,setIsLoggedIn] = useState((web3auth?.privKey ? true:false))
  
  const onLogout = async() => {
    if (!web3auth) {
     
      return;
    }

    
    await web3auth.logout();

    if (!web3auth.privKey) {
       setIsLoggedIn(false)
    }
  };

  const doLogin = async(arg)=>{
    const scheme = "icealerts"; // Or your desired app redirection scheme
    const resolvedRedirectUrl = `${scheme}://openlogin`;
   
    try{
    await web3auth.login({
      redirectUrl: resolvedRedirectUrl,
      mfaLevel: "optional", // Pass on the mfa level of your choice: default, optional, mandatory, none
     loginProvider: arg, // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
    });
    setIsLoggedIn(true)
    var userInfo = web3auth.userInfo();
  }catch(error)
  {
  }
   

  }
  useEffect(()=>{
    async function checkLogin(){
      await web3auth.init()
      if(web3auth?.privKey)
      {
         setIsLoggedIn(true)
         
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
        <Tab.Screen name ="Scan"  component={Main} options={{tabBarIcon:({focused})=> <MaterialCommunityIcons name="credit-card-scan" size={25}  color={(focused ? "red":"white")} />,headerTitle:'Scan Smart Tag'}}/>
        <Tab.Screen  initialParams={{web3auth:web3auth}} name="Register"  component={Write} options={{tabBarIcon:({focused})=> <AntDesign name="addfile" size={25}  color={(focused ? "red":"white")} />,headerTitle:'Register Tag'}}/>
        <Tab.Screen initialParams={{web3auth:web3auth}} name="Contacts" component={Contacts} options={{tabBarIcon:({focused})=> <AntDesign name={'contacts'} size={25} color={(focused ? "red":"white")} />,headerTitle:'+ Emergency Contacts'}}/>

        <Tab.Screen initialParams={{web3auth:web3auth}} name={'Settings'} component={Qrcode} options={{tabBarIcon:({focused})=> <Feather name={'settings'} size={25} color={(focused ? "red":"white")} />}}/>

    
    </Tab.Navigator>
    </ToastProvider>
    </NavigationContainer>}
    { !isLoggedIn && <Login login={doLogin}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({container:{   flex:1,     marginTop:StatusBar.currentHeight
}})
