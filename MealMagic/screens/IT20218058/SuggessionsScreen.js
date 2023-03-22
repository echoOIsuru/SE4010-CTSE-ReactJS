import React from 'react'
import { View, Button, Text } from 'react-native'

export default function SuggessionsScreen({ navigation }) {
  return (
    <View>
        <Text>SuggessionsScreen</Text>

        <Button
            title="Go to new"
            onPress={() => navigation.navigate('GroceryHome')}
        />

    </View>  
    )
}
