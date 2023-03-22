import React from 'react'
import { View, Button, TextInput } from 'react-native'
import { Text } from 'react-native-elements';

export default function GroceryHomeScreen({ navigation }) {
  return (
    <View>
      <Text h4>My Grocery List</Text>
      <Text>GroceryHomeScreen</Text>

      <Button
        title="Go to new"
        onPress={() => navigation.navigate('CreateGrocery')}
      />

    </View>
  )
} 
