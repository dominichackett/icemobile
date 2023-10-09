import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Logout({ onLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle the logout action here
    // You can call the onLogout function passed as a prop
    onLogout();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown} style={{ marginLeft: 15 }}>
        <MaterialCommunityIcons name='dots-vertical'  size={28} color='black' />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
          {/* Add other menu options here */}
        </View>
      )}
    </View>
  );
}

const styles = {
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Adjust the top position as needed
    right: 0,
    backgroundColor: 'white',
    zIndex: 1,
  },
  text:{
    padding: 10,
    borderRadius: 8, // Adjust the border radius as needed
    borderWidth: 1,
    borderColor: 'lightgray', // Use the color you want for the border
    fontSize:20    
  }
};
