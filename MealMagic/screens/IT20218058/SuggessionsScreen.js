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
    console.log("yyyyyyyyy : ", gId)


    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [list, setList] = useState(gId.name);

    const [inputFields, setInputFields] = useState([
        { ingredient: '', amount: '' }
    ])

    const handleFormChange1 = (index, event) => {

        setIngredient(event);
        let data = [...inputFields];
        data[index]["ingredient"] = event;
        setInputFields(data);
    }

    const handleFormChange2 = (index, event) => {

        setAmount(event);
        let data = [...inputFields];
        data[index]["amount"] = event;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { ingredient: '', amount: '' }
        let x = [...inputFields, newfield]
        setInputFields([...inputFields, newfield])
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(";;;;;;;", inputFields[0].amount)

        let data = {
            // name: list,
            // items: inputFields
            amount: inputFields[0].amount,
            ingredient: inputFields[0].ingredient
        }

        const docRef = firebase.firestore().collection('grocery').doc(gId.id);

        // Update the array field
        docRef.update({
            items: firebase.firestore.FieldValue.arrayUnion(data),
            // ingredient: firebase.firestore.FieldValue.arrayUnion(data.ingredient)
        })
            .then(() => {
                console.log('Array updated successfully');
            })
            .catch((error) => {
                console.error('Error updating array:', error);
            });


        navigation.navigate('GroceryHome')

    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const [data, setData] = useState([

    ]);

    const lineRefs = React.useRef([]);
    lineRefs.current = data.map((_, i) => lineRefs.current[i] ?? createRef());

    const [modalVisible, setModalVisible] = useState(false);
    const buttonRef = useRef(null);
    const [buttonRefCourse, setButtonRefCourse] = useState(useRef([]));

    const [list1, setList1] = useState("Update Groceries");
    const [numberOfItems, setNumberOfItems] = useState(8);
    const [callParent, setCallParent] = useState(false);

    useEffect(() => {

    }, [])

    return (
        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
            <View style={{ alignSelf: 'flex-start', padding: 20 }}>
                <HStack m={-10} spacing={150} >
                    <Text style={{ fontSize: 22, color: 'black', marginTop: 15 }}>{list1}</Text>
                </HStack>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.wrapper1}>
                    <Text>List name :           {gId.name}</Text>

                </View>
                <ScrollView
                    style={{ backgroundColor: '#F1F1F1' }}>
                    {
                        <Box h={5000}>

                            {inputFields.map((input, index) => {
                                return (

                                    <View key={index}>
                                        <VStack m={4} spacing={22} style={{ backgroundColor: "#E3F3F2" }} key={index}>

                                            <View style={styles.wrapper2}>
                                                <TextInput
                                                    style={styles.space}
                                                    name='ingredient'
                                                    placeholder='Ingredient'
                                                    onChangeText={event => handleFormChange1(index, event)}
                                                />
                                                <TextInput
                                                    style={styles.space0}
                                                    name='amount'
                                                    placeholder='Amount'
                                                    onChangeText={event => handleFormChange2(index, event)}
                                                />
                                                <View style={styles.space2} >
                                                    <Icon
                                                        name='trash'
                                                        type='font-awesome'
                                                        color='#B73728'
                                                        onPress={() => removeFields(index)} />
                                                </View>
                                            </View>
                                        </VStack>

                                    </View>


                                );
                            })

                            }

                            <Button
                                color='#90CDE1'
                                title='Add more...'
                                onPress={addFields}
                            />

                            <Button
                                color='#90E192'
                                title="Update"
                                onPress={submit}
                            />

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
