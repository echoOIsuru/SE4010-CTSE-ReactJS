import React from 'react'
import { View, Button, Text } from 'react-native'

export default function EditGroceryScreen({ navigation }) {
  return (
    <View>
        <Text>EditGroceryScreen</Text>

        <Button
            title="Go to new"
            onPress={() => navigation.navigate('GroceryHome')}
        />

    </View>   
    )
}
