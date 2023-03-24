import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'

export default function HomeScreen({ route, navigation }) {

    const user = route.params;

    useEffect(() => {
        console.log(user.uid, "User")


    }, [])


    const go = () => {
        navigation.navigate('Meal Plan', { ...user })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Test"
                onPress={() => { go() }}
            />
        </View>
    )
}
