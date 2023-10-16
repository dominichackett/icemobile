import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useEffect,useState } from 'react';
import * as PushAPI from "@pushprotocol/restapi";
import {ethers} from 'ethers'
import Notify from './Notifications/Notify';
const FirstRoute = () => (
  <Notify style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);



const CallsRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#693ab7' }} />
  );


export default function Notifications({route}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [notifications,setNotifications] = useState([])
  const [routes] = React.useState([
    { key: 'first', title: 'Notifications' },
    { key: 'second', title: 'Chats' },
    { key: 'calls', title: 'Calls' },
  ]);
  const {privateKey} = route.params
  const [wallet,setWallet] = useState()
  const renderScene = ({ route }) => {

    switch (route.key) {
      case 'first':
        return <Notify notifications={notifications} />;
      case 'second':
        return <SecondRoute />;
        case 'calls':
            return <CallsRoute />;   
      default:
        return null;
    }
  };
  useEffect(()=>{
      const _wallet = new ethers.Wallet(privateKey)
      setWallet(_wallet)
 
   },[])

   useEffect(()=>{
    async function getNotifications(){
        const goerliProvider = ethers.getDefaultProvider("goerli");
        const _notifications = await PushAPI.user.getFeeds({
            user: `eip155:5:${wallet.address}`, // user address in CAIP
            env: 'staging',
            spam:true

          });
       // const signer =  await wallet.connect(goerliProvider)
        //const provider = new ethers.providers.InfuraProvider("goerli","1627072ef1944debb4daefbb326adb7e")
        const provider = ethers.getDefaultProvider("goerli");

        const signer = wallet.connect(provider);
        
        console.log(_notifications)
        setNotifications(_notifications)
        //console.log(web3auth)
       // console.log(wallet)
   //   const user = await PushAPI.initialize(wallet,{env:'staging'});
        //const info = await user.notification.list();
        //console.log(info)  
    }
    if(wallet)
      getNotifications()
   },[wallet])
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}