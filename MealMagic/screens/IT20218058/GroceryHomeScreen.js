import React from 'react'
import { View, Button, Text } from 'react-native'

export default function GroceryHomeScreen({ navigation }) {
  return (
    <View>
        <Text>GroceryHomeScreen</Text>

        <Button
            title="Go to new"
            onPress={() => navigation.navigate('CreateGrocery')}
        />

    </View>
  )
} 
