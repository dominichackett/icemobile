import React, { useState, useEffect } from 'react';
import {TextInput, Text, View, StyleSheet, Image,FlatList ,ScrollView,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Notify(props) {

    return (    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <FlatList data={props?.notifications} 
      keyExtractor={(item,index)=>index}
      renderItem={({item})=>(
        <View style={styles.item}>
             <Image
        source={{uri:item.icon}}
        style={styles.image}
      />      
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.message}</Text>
          </View>
          <TouchableOpacity >   
          
          </TouchableOpacity>
        </View>
      )}
    />
    </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 60,
      height: 60,
      marginRight:8
     
   
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
      } ,scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
  
  });