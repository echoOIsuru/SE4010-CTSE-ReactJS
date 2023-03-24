import React, { useEffect, useState, useRef, createRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, ToastAndroid, TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import { HStack, Button } from "@react-native-material/core";
import { VStack, Box, Divider, Avatar } from "@react-native-material/core";
import { collection, doc, addDoc } from "firebase/firestore";
import { firebase } from '../../config';


export default function ListView({ route, navigation }) {

    const gId = route.params;
    console.log("xxxxxxxxx : ", gId.id)

    const [render, setRender] = useState(false)


    const [data, setData] = useState([

    ]);

    const lineRefs = React.useRef([]);
    lineRefs.current = data.map((_, i) => lineRefs.current[i] ?? createRef());


    const [list1, setList1] = useState("View Grocery Details");

    useEffect(() => {

        firebase.firestore().collection('grocery').onSnapshot(querySnapshot => {
            const groceryList = []
            querySnapshot.forEach(async (doc) => {
                const { name, items } = doc.data()
                // console.log("000000", groceryList)

                if (gId.id == doc.id) {
                    groceryList.push({
                        id: doc.id,
                        name,
                        items
                    })
                }

            })
            console.log("000000", groceryList)

            setData(groceryList)
            setRender(true)
        })

    }, [])


    return (
        <>

            {
                render ?
                    <>
                        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
                            <View style={{ alignSelf: 'flex-start', padding: 20 }}>
                                <HStack m={-10} spacing={150} >
                                    <Text style={{ fontSize: 22, color: 'black', marginTop: 15 }}>{list1}</Text>
                                </HStack>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={styles.wrapper1}>
                                    <Text>List name :           {data[0].name}</Text>
                                </View>

                                <ScrollView
                                    style={{ backgroundColor: '#F1F1F1' }}>
                                    {
                                        <Box h={5000}>

                                            {data.map((input, index) => {
                                                return (

                                                    <>
                                                        <Text style={{ fontWeight: 'bold', paddingTop: 30 }}>      Ingredient           Amount</Text>

                                                        <View key={index}>
                                                            <VStack m={4} spacing={22} style={{ backgroundColor: "#E3F3F2" }} key={index}>

                                                                {input.items.map((values) => (
                                                                    <View style={styles.wrapper2}>
                                                                        <TextInput
                                                                            style={styles.space}
                                                                            name='ingredient'
                                                                            value={values.ingredient}
                                                                        />
                                                                        <TextInput
                                                                            style={styles.space0}
                                                                            name='amount'
                                                                            value={values.amount}
                                                                        />
                                                                    </View>
                                                                ))}

                                                            </VStack>

                                                        </View>
                                                    </>

                                                );
                                            })

                                            }

                                        </Box>
                                    }

                                </ScrollView>

                            </View>
                            <HStack m={12} spacing={110} >

                            </HStack>

                            <Button
                                title='Cancel'
                                color='#A5B6B9'
                                onPress={() => navigation.navigate('GroceryHome')}
                            />

                        </View>
                    </>
                    :
                    <>

                    </>
            }
        </>

    )
}

const styles = StyleSheet.create({
    logo: {
        width: 380,
        height: 300,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 15,
    },
    space: {
        margin: 2
    },
    wrapper2: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 15,
    },
    space: {
        marginLeft: 20,
        marginRight: 40
    },
    space0: {
        marginLeft: 50,
        marginRight: 0,
    },
    space1: {
        marginLeft: 20,
        marginRight: 40,
        marginTop: -4
    },
    space2: {
        marginLeft: 100,
        marginRight: 0,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    all: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper1: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 15,
        paddingLeft: 20
    },

});

