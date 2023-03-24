import React, { useState } from 'react';
import { Image, Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PopuWindow = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View >
                            <View>
                                <View >
                                    <View>
                                        <Text style={styles.title}> {props.item.name} </Text>
                                    </View>
                                </View>
                                <Text style={styles.data}>
                                    <Text style={styles.price}>
                                        {"Dietary : "}
                                    </Text>
                                    {props.item.selectedDietary}
                                </Text>
                                <Text style={styles.data}>
                                    <Text style={styles.price}>
                                        {"Category : "}
                                    </Text>
                                    {props.item.selectedMealCategory}
                                </Text>
                                <Text style={styles.price}>
                                    {"Days of Week : "}
                                    {props.item.selectedDays.map((data) => {
                                        return (<Text style={styles.data}>
                                            {data + ",  "}
                                        </Text>)
                                    })}
                                </Text>
                                <Text style={styles.price}>
                                    {"Recipies : "}
                                    {props.item.selecteRecipe.map((data) => {
                                        return (<Text style={styles.data}>
                                            {data + ",  "}
                                        </Text>)
                                    })}
                                </Text>
                            </View>
                        </View>

                        <Image style={styles.image} source={{ uri: props.item.url }} width={230} height={230} />
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialIcons style={styles.view} name="cancel" color='red' />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <MaterialIcons style={styles.view} name="preview" color='blue' />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    view: {
        fontSize: 25
    },

    delete: {
        fontSize: 25
    },
    cardImage: {
        flex: 1,
        height: 20,
        width: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
    },
    data: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
    },
    image: {
        marginTop: 20,
        marginBottom: 20
    }

});

export default PopuWindow;