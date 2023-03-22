import React from 'react'
import { View, Button, Text } from 'react-native'

export default function ViewGroceryScreen({ navigation }) {
  return (
    <View>
        <Text>ViewGroceryScreen</Text>

        <Button
            title="Go to new"
            onPress={() => navigation.navigate('GroceryHome')}
        />

    </View>  
    )
}
