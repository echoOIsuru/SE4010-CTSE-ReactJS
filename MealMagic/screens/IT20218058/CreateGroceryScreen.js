import React from 'react'
import { View, Button, Text } from 'react-native'

export default function CreateGroceryScreen({ navigation }) {
  return (
    <View>
        <Text>CreateGroceryScreen</Text>

        <Button
            title="Go to new"
            onPress={() => navigation.navigate('Suggessions')}
        />

    </View>  
    )
}
