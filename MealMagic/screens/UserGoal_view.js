import * as React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, StyleSheet, Pressable,ImageBackground } from 'react-native';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation, validatePathConfig } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/core";
import { firebase } from '../config';
import { QuerySnapshot } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import NavigationBar from '../components/meal_planner/NavigationBar';
export default function GoalList() {

    const [items, setItems] = useState([]);
    const Ref = firebase.firestore().collection('goals')
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    [id, setid] = useState('');


    useEffect(() => {
        return Ref.orderBy('duration', 'desc').onSnapshot(
            querySnapshot => {
                const items = []
                querySnapshot.forEach((doc) => {
                    const { age, checked, duration } = doc.data()
                    items.push({
                        id: doc.id,
                        age,
                        checked,
                        duration,
                    })
                })
                setItems(items)
            }
        )

    }, [isFocused])


    const deleteTodo = (todos) => {

        Ref.doc(todos.id).delete().then(() => {
            //show allert
            Alert.alert("deleted ")
        }).catch(error => {
            alert(error);
        })
    }

    return (


        <>
           <ImageBackground source={require('../assets/green.png')}style={{resizeMode: 'cover', justifyContent: 'center', paddingHorizontal: 10, opacity: 0.9 }}>
            <View style={{ backgroundColor: '', }}>

                <View>
                    <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'center', padding: 25, color: '#000000' }}>Goal List</Text>
                </View>

                <View style={{ flexDirection: "row", paddingBottom: 15, backgroundColor: '', paddingBottom: 20 }}>
                    <Image style={{ width: 425, height: 175, }} source={require('../assets/UerGoalCreate.png')} />
                </View>

                <View style={{ flexDirection: "row", paddingBottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                    {/* <Text style={{ fontSize:20, fontWeight: '500',width:50,marginLeft:35}}>Meal</Text>    */}
                    <Text style={{ fontSize: 20, fontWeight: '500', width: 150, marginLeft: 25 }}>Time Period</Text>
                    <Text style={{ fontSize: 20, fontWeight: '500', width: 50, marginLeft: 10 }}>Goal</Text>
                    <Text style={{ fontSize: 20, fontWeight: '500', width: 100, marginLeft: 60, }}>Action</Text>


                </View>

                <FlatList
                    data={items}
                    numColumns={1}
                    renderItem={({ item }) => (

                        <Pressable
                            onPress={() => navigation.navigate('List', { item })}>


                            <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '', paddingBottom: 20, paddingTop: 10 }} key={item.id}>
                                {/* <Text style={{ fontSize:20, fontWeight: '400',width:50,marginLeft:25}}>{item.age}</Text>   */}

                                <Text style={{ fontSize: 20, fontWeight: '400', width: 100, marginLeft: 10 }}>{item.duration}</Text>
                                <Text style={{ fontSize: 20, fontWeight: '400', width: 100, marginLeft: 45 }}>{item.checked}</Text>

                                <FontAwesome
                                    name='edit'
                                    color='blue'
                                    onPress={() => navigation.navigate('Update', { item })}
                                    style={styles.todoIcon}
                                />
                                <View style={{ margin: 10 }}>

                                    <FontAwesome
                                        name='trash-o'
                                        color='red'
                                        onPress={() => deleteTodo(item)}
                                        style={styles.todoIcon}
                                    />

                                </View>

                            </View>
                        </Pressable>


                    )}
                />

            </View >
            <View style={{paddingTop:550,backgroundColor:''}}>
            <NavigationBar />
            </View>
            </ImageBackground>  
        </>
   
    );


}
const styles = StyleSheet.create({

    todoIcon: {

        marginTop: 5,
        fontSize: 35,
        marginLeft: 14,
    }




})