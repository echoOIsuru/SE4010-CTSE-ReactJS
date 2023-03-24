import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { firebase } from '../../config'
import { removeMealPlan } from '../../services/meal_planner/api';
import CardView from '../../components/meal_planner/CardView';
import { Searchbar } from 'react-native-paper';

export default function MealPlanScreen({ route, navigation }) {

    const [eventList, setEventList] = useState([])
    const [filterdList, setFilterdList] = useState([])
    const todoRef = firebase.firestore().collection('meals')
    const user = route.params;
    const [render, setRender] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {

        todoRef.onSnapshot(querySnapshot => {
            const mealPlan = []
            querySnapshot.forEach(async (doc) => {
                const { uid, name, selecteRecipe, selectedDays, selectedDietary, selectedMealCategory, url } = doc.data()

                console.log(user.uid, "PARAMS")
                console.log(uid, "OUTPUT")

                if (user.uid == uid) {
                    mealPlan.push({
                        id: doc.id,
                        name,
                        selecteRecipe,
                        selectedDays,
                        selectedDietary,
                        selectedMealCategory,
                        url
                    })
                }

            })
            console.log(user, "========NAME")
            setEventList(mealPlan)
            setFilterdList(mealPlan)
            setRender(true)
        })
        // setEventList(viewMealPlans())

    }, [])

    showAlert = viewId => {
        Alert.alert('alert', 'event clicked ' + viewId)
    }

    const deleteMeal = (data) => {
        Alert.alert('Confirm', 'Do you want to delete this meal plan?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => {
                    removeMealPlan(data)
                    setRender(false)
                    setRender(true)
                }
            },
        ]);

    }

    const updateMeal = (data) => {
        navigation.navigate('Add Meal Plan', {
            ...user,
            ...data
        })
    }

    const onChangeSearch = (query) => {

        if (query != null) {
            const results = eventList.filter(
                o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(query.toLowerCase()))
            );
            console.log(results)
            setFilterdList(results)
        }

    };

    return (
        <>
            {
                render ?
                    <>
                        <Searchbar
                            placeholder='Search...'
                            value={searchQuery}
                            onChangeText={(event) => {
                                setSearchQuery(event);
                                onChangeSearch(event);
                            }}
                        />
                        <CardView data={filterdList}
                            updateMeal={(data) => { updateMeal(data) }}
                            deleteMeal={(data) => { deleteMeal(data) }} />
                        <TouchableOpacity onPress={() => { navigation.navigate('Add Meal Plan', { ...user }) }}>
                            <MaterialIcons style={styles.add} name="add" color='green' />
                        </TouchableOpacity>
                    </>

                    :
                    <View style={[styles.scontainer, styles.shorizontal]}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    eventList: {
        marginTop: 20,
        marginBottom: 20
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#F3FFE0'
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
        width: 250,
    },
    eventTime: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#151515',
        marginBottom: 15
    },
    userName: {
        fontSize: 16,
        color: '#151515',
        alignSelf: 'center'
    },
    delete: {
        marginLeft: 2,
        fontSize: 35
    },
    add: {
        fontSize: 60,
        alignSelf: 'center'
    },
    scontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    shorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})
