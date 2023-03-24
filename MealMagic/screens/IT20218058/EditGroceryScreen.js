// import React, { useEffect, useState, useRef, createRef } from 'react'
// import { View, Text, StyleSheet, ScrollView, Alert, ToastAndroid, TextInput } from 'react-native';
// import { Icon } from '@rneui/themed';
// import { HStack, Button } from "@react-native-material/core";
// import { VStack, Box, Divider, Avatar } from "@react-native-material/core";
// import { collection, doc, addDoc } from "firebase/firestore";
// import { firebase } from '../../config';


// export default function ListView({ route, navigation }) {

//     const gId = route.params;
//     console.log("xxxxxxxxx : ", gId.id)

//     const [render, setRender] = useState(false)

//     const [ingredient, setIngredient] = useState('');
//     const [amount, setAmount] = useState('');
//     const [list, setList] = useState('');

//     const [inputFields, setInputFields] = useState([
//         { ingredient: '', amount: '' }
//     ])

//     const handleFormChange1 = (event, data, i) => {

//         // setIngredient(event);
//         // let data = [...inputFields];
//         // data[index]["ingredient"] = event;
//         // // setInputFields(data);
//         console.log(event,";;;;;;;;;", i)
//     }

//     // const handleFormChange2 = (index, event) => {

//     //     // setAmount(event);
//     //     let data = [...inputFields];
//     //     data[index]["amount"] = event;
//     //     // setInputFields(data);
//     //     console.log("2222222222")
//     // }

//     // const addFields = () => {
//     //     let newfield = { ingredient: '', amount: '' }
//     //     let x = [...inputFields, newfield]
//     //     setInputFields([...inputFields, newfield])
//     // }

//     const submit = (e) => {
//         e.preventDefault();
//         console.log(";;;;;;;", inputFields)

//         firebase.firestore().collection('grocery').doc(gId.id).update(
//             {
//                 ...inputFields
//             }
//         ).then((res) => {
//             console.log("updated")
//         }).catch((error) => {
//             console.log(error)
//         });

//         navigation.navigate('GroceryHome')
//     }

//     // const removeFields = (index) => {
//     //     let data = [...inputFields];
//     //     data.splice(index, 1)
//     //     setInputFields(data)
//     // }

//     const [data, setData] = useState([

//     ]);

//     const lineRefs = React.useRef([]);
//     lineRefs.current = data.map((_, i) => lineRefs.current[i] ?? createRef());

//     const [modalVisible, setModalVisible] = useState(false);
//     const buttonRef = useRef(null);
//     const [buttonRefCourse, setButtonRefCourse] = useState(useRef([]));

//     const [list1, setList1] = useState("View Grocery Details");
//     const [numberOfItems, setNumberOfItems] = useState(8);
//     const [callParent, setCallParent] = useState(false);

//     useEffect(() => {

//         firebase.firestore().collection('grocery').onSnapshot(querySnapshot => {
//             const groceryList = []
//             querySnapshot.forEach(async (doc) => {
//                 const { name, items } = doc.data()
//                 // console.log("000000", groceryList)

//                 if (gId.id == doc.id) {
//                     groceryList.push({
//                         id: doc.id,
//                         name,
//                         items
//                     })
//                 }

//             })
//             console.log("000000", groceryList)

//             setData(groceryList)
//             setRender(true)
//         })

//     }, [])


//     return (
//         <>

//             {
//                 render ?
//                     <>
//                         <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
//                             <View style={{ alignSelf: 'flex-start', padding: 20 }}>
//                                 <HStack m={-10} spacing={150} >
//                                     <Text style={{ fontSize: 22, color: 'black', marginTop: 15 }}>{list1}</Text>
//                                 </HStack>
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <View style={styles.wrapper1}>
//                                     <Text>Enter a list name : </Text>
//                                     <TextInput
//                                         style={styles.space1}
//                                         name='list'
//                                         defaultValue={data[0].name}
//                                         onChangeText={event => setList(event)}
//                                     />
//                                 </View>

//                                 <ScrollView
//                                     style={{ backgroundColor: '#F1F1F1' }}>
//                                     {
//                                         <Box h={5000}>

//                                             {data.map((input, index) => {
//                                                 return (

//                                                     <>
//                                                         <Text style={{ fontWeight: 'bold', paddingTop: 30 }}>      Ingredient           Amount</Text>

//                                                         <View key={index}>
//                                                             <VStack m={4} spacing={22} style={{ backgroundColor: "#E3F3F2" }} key={index}>

//                                                                 {input.items.map((values, i) => (
//                                                                     <View style={styles.wrapper2}>
//                                                                         <TextInput
//                                                                             style={styles.space}
//                                                                             name='ingredient'
//                                                                             placeholder={values.ingredient}
//                                                                             defaultValue={values.ingredient}
//                                                                             onChangeText={
//                                                                                (event)=>{handleFormChange1(event,values.ingredient, i)} 
//                                                                             }
//                                                                         />
//                                                                         <TextInput
//                                                                             style={styles.space0}
//                                                                             name='amount'
//                                                                             placeholder={values.amount}
//                                                                             defaultValue={values.amount}
//                                                                             onChangeText={
//                                                                                 (event)=>{handleFormChange1(event,values.amount, i)} 
//                                                                             }
//                                                                         />
//                                                                     </View>
//                                                                 ))}

//                                                             </VStack>

//                                                         </View>
//                                                     </>

//                                                 );
//                                             })

//                                             }

//                                             <Button
//                                                 color='#90E192'
//                                                 title="Save"
//                                                 onPress={submit}
//                                             />

//                                         </Box>
//                                     }

//                                 </ScrollView>

//                             </View>
//                             <HStack m={12} spacing={110} >

//                             </HStack>

//                             <Button
//                                 title='Cancel'
//                                 color='#A5B6B9'
//                                 onPress={() => navigation.navigate('GroceryHome')}
//                             />

//                         </View>
//                     </>
//                     :
//                     <>

//                     </>
//             }
//         </>

//     )
// }

// const styles = StyleSheet.create({
//     logo: {
//         width: 380,
//         height: 300,
//     },
//     wrapper: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignContent: 'center',
//         paddingVertical: 15,
//     },
//     space: {
//         margin: 2
//     },
//     wrapper2: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignContent: 'center',
//         paddingVertical: 15,
//     },
//     space: {
//         marginLeft: 20,
//         marginRight: 40
//     },
//     space0: {
//         marginLeft: 50,
//         marginRight: 0,
//     },
//     space1: {
//         marginLeft: 20,
//         marginRight: 40,
//         marginTop: -4
//     },
//     space2: {
//         marginLeft: 100,
//         marginRight: 0,
//         justifyContent: "flex-end",
//         flexDirection: "row",
//     },
//     all: {
//         // flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     wrapper1: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignContent: 'center',
//         paddingVertical: 15,
//         paddingLeft: 20
//     },

// });


///////////////////////////////////////////////////////////////////////

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

    const addMore = () => {
        navigation.navigate('Suggessions', {
            id: gId.id,
            name: data[0].name
          })
    }


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

                                            <Button
                                                color='#90CDE1'
                                                title='Add more items'
                                                onPress={addMore}
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

