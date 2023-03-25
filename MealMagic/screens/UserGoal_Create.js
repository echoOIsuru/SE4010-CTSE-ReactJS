import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button, TextInput, StyleSheet, Alert,ImageBackground } from 'react-native';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import NavigationBar from '../components/meal_planner/NavigationBar';
export default function Create() {
  const navigation = useNavigation();
  const [age, setAge] = useState('');
  const [duration, setDuration] = useState('');
  const [checked, setChecked] = useState('');
  const todoRef = firebase.firestore().collection('goals')

  const create = () => {
    if (!age||!checked||!duration) {
      Alert.alert("Plese Fill Input Feelds!")
    }
    else {
      const data = {
        age: age,
        checked: checked,
        duration: duration,
      };
      todoRef.add(data).then(() => {
        setAge('');
        setDuration('');
        setChecked('');

      }).catch((error) => {
        alert(error);
      })
      navigation.navigate('Goal List')
    }
  }





  return (
    
    <>
    <ImageBackground source={require('../assets/green.png')}style={{resizeMode: 'cover', justifyContent: 'center', paddingHorizontal: 10, opacity: 0.9 }}>
    <View style={{ justifyContent: 'center', }}>

      <View>
        <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'center', padding: 45, color: '#000000', }}>Create Diet Goal</Text>
      </View>

      <View style={{ flexDirection: "row", paddingBottom: 15,alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 375, height: 175, }} source={require('../assets/UerGoalCreate.png')} />
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', justifyContent: 'space-between', paddingBottom: 30, paddingTop: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          placeholder="Enter Meal Name"
          keyboardType='default'
        ></TextInput>

        <TextInput
          style={styles.input}
          onChangeText={setDuration}
          value={duration}
          placeholder=" Diet Goal Duration"
          keyboardType='default'
        ></TextInput>
      </View>

      <View style={{ flexDirection: "row", paddingTop: 0, paddingBottom: 0, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '400', width: 150, paddingTop: 0 }}>Healthy</Text>
        <RadioButton
          value="Healthy"
          status={checked === 'Healthy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Healthy')}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: 'center', paddingTop: 15, }}>
        <Text style={{ flexDirection: "row", fontSize: 20, fontWeight: '400', width: 150, }}>Increase weight</Text>
        <RadioButton
          value="Increase weight"
          status={checked === 'Increase weight' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Increase weight')}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: 'center', paddingTop: 15, }}>
        <Text style={{ flexDirection: "row", fontSize: 20, fontWeight: '400', width: 150 }}>Decrease weight</Text>
        <RadioButton
          value="Decrease weight"
          status={checked === 'Decrease weight' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Decrease weight')}
        />
      </View>

      <View style={{ paddingTop: 10, width: 200, textAlign: 'center', alignSelf: 'center', paddingBottom:20 }}>

        <Button
          title="Submit"
          onPress={create}>
        </Button>
      </View>

    </View>
    </ImageBackground>
    <NavigationBar/>
    </>
  );



}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 230,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#ECECEC',
  },

});