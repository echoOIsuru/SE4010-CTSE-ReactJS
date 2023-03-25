import React from 'react'
import { HStack } from "@react-native-material/core";
import { Icon } from '@rneui/themed';
import { View } from 'react-native';

function NavigationBar() {
    return (
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 30 }}>
            <HStack m={3} spacing={142}>
                <Icon
                    name='home'
                    type='font-awesome'
                    color='#166697'
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => console.log('CLICKED')} />
                <Icon
                    name='user'
                    type='font-awesome'
                    color='#166697'
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => console.log('CLICKED')} />
                <Icon
                    name='bell'
                    type='font-awesome'
                    color='#166697'
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => console.log('CLICKED')} />
            </HStack>
        </View>
    )
}

export default NavigationBar