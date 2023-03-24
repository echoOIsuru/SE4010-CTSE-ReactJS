import React, { useEffect, useState, useRef, createRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, ToastAndroid, TextInput, Platform } from 'react-native';
import { Icon } from '@rneui/themed';
import { HStack, Button } from "@react-native-material/core";
import { VStack, Box, Divider, Avatar } from "@react-native-material/core";
import { collection, doc, addDoc } from "firebase/firestore";
import { firebase } from '../../config';
import Toast from 'react-native-toast-message';


export default function ListView({ navigation }) {

    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [list, setList] = useState('');

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
        console.log(";;;;;;;", inputFields)

        let data = {
            name: list,
            items: inputFields
        }

        firebase.firestore().collection('grocery').add(data).then((res) => {
            console.log(res)
            // if (Platform.OS === 'android') {
            //     ToastAndroid.show("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", ToastAndroid.SHORT);
            //   } else {
            //     // For iOS, you can use a library like react-native-toast-message
            //     // Here's an example of how to use it:
                // Toast.show({
                //   text1: "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
                //   visibilityTime: 2000,
                //   autoHide: true,
                //   topOffset: 30,
                //   bottomOffset: 40,
                // });
            //   }
        }).catch((error) => {
            console.log(error)
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

    const [list1, setList1] = useState("Create Grocery List");
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
                    <Text>Enter a list name : </Text>
                    <TextInput
                        style={styles.space1}
                        name='list'
                        placeholder='List Name'
                        onChangeText={event => setList(event)}
                    />
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
                                                <View  style={styles.space2} >
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
                                title="Save"
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
