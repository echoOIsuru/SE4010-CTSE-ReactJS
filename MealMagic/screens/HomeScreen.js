import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'
import { addMealPlan } from '../services/api'

export default function HomeScreen({ route, navigation }) {

    const user = route.params;

    useEffect(() => {
        console.log(user.uid, "User")


    }, [])


  




    const go = () => {
        addMealPlan()
      // navigation.navigate('Test')
       
    }


    const go2 = () => {

        navigation.navigate('Creat Goal')
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Test"
                onPress={() => { go() }}
            />

<Button
                title="Creat Goal"
                onPress={() => { go2() }}
            />


        </View>
    )
}
