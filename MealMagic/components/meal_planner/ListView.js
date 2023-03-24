import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


export default function ListView(props) {

    const [eventList, setEventList] = useState([])
    const item = props.item;

    showAlert = viewId => {
        Alert.alert('alert', 'event clicked ' + viewId)
    }

    return (
        <View style={styles.container}>
            <FlatList
                enableEmptySections={true}
                style={styles.eventList}
                data={eventList}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={() => {
                    return (
                        <>
                            <TouchableOpacity >
                                <View style={styles.eventBox}>
                                    <View style={styles.eventDate}>
                                        <Text style={styles.eventDay}>{item.day}</Text>
                                        <Text style={styles.eventMonth}>{props.item.days}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.eventContent} onPress={() => showAlert('row')}>
                                        <Text style={styles.eventTime}>{props.item.mealName}</Text>
                                        <Text style={styles.userName}>{props.item.mealCategory}</Text>
                                        <Text style={styles.description}>
                                            {props.item.days}
                                            {props.item.dietary}
                                            {props.item.recipies}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.eventDate}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <MaterialIcons style={styles.delete} name="delete" color='#fff' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { }}>
                                            <MaterialIcons style={styles.delete} name="edit" color='#fff' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>)
                }
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DCDCDC',
    },
    eventList: {
        marginTop: 20,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        fontSize: 50,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventMonth: {
        fontSize: 16,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    description: {
        fontSize: 15,
        color: '#646464',
        width: 300
    },
    eventTime: {
        fontSize: 18,
        color: '#151515',
    },
    userName: {
        fontSize: 16,
        color: '#151515',
    },
    delete: {
        marginLeft: 2,
        fontSize: 35
    },
})
