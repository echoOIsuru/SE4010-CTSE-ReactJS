import React, { useState } from 'react'
import { Alert, Image, ScrollView, Keyboard, View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { firebase } from '../../config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AsyncStorage } from 'react-native';

function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginFlag, setLoginFlag] = useState(false)
    const [signFlag, setSignFlag] = useState(false)

    const signIn = () => {
        setSignFlag(true)
        if (email !== '' && password !== '') {
            console.log("sign in clicked!")
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setSignFlag(false)
                    navigation.navigate('Home', {
                        uid: user.uid
                    })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert(
                        'Alert',
                        `${errorMessage}`,
                    )
                    setSignFlag(false)

                    console.log(error)

                });
        } else {
            Alert.alert(
                'Alert',
                'Please try again with correct data',
            )
            setSignFlag(false)
        }

    }

    const login = () => {
        setLoginFlag(true)
        if (email !== '' && password !== '') {
            console.log("login clicked!")
            try {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(res => {
                        const user = res.user;
                        console.log(res.user.uid);

                        navigation.navigate('Dashboard', {
                            uid: user.uid
                        })
                        setLoginFlag(false)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        console.log(error)

                        Alert.alert(
                            'Alert',
                            `${errorMessage}`,
                        )
                        setLoginFlag(false)
                    });
            } catch (error) {
                Alert.alert(
                    'Alert',
                    'Please try again with correct data',
                )
                console.log(error.code);
                setLoginFlag(false)
            }
        } else {
            Alert.alert(
                'Alert',
                'Please try again with correct data',
            )
            setLoginFlag(false)
        }


    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/splashScreen.png")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => { login() }}>
                {
                    loginFlag ?
                        <ActivityIndicator size="large" color="red" />
                        : <Text style={styles.loginText}>
                            LOGIN
                        </Text>

                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.signBtn} onPress={() => { signIn() }}>
                {
                    signFlag ? <ActivityIndicator size="large" color="red" />
                        :
                        <Text style={styles.loginText}>SIGN IN</Text>
                }


            </TouchableOpacity>
        </View>
    )

}
export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        height: 300,
        width: 300
    },
    inputView: {
        backgroundColor: "#ebf2c9",
        borderRadius: 30,
        width: "90%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        alignContent: 'center'
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#5BFF92",
    },
    signBtn: {
        width: "30%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#5BFF92",
    },
});