import React, {useState,useEffect} from 'react'
import { View, Text, Image,Button,TextInput, StyleSheet,Alert } from 'react-native';
import {firebase} from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
export default function Create() {
    const navigation = useNavigation();
    const [age, setAge] = useState(''); 
    const [duration, setDuration] = useState('');
    const [checked, setChecked] =useState(''); 
    const todoRef=firebase.firestore().collection('goals')

    const create = ()=>  {
     {

          const data={
              age:age,
              checked:checked,
              duration:duration,
              
          };
          todoRef.add(data).then(()=>{
              setAge(''); 
              setDuration(''); 
              setChecked(''); 
              
          }).catch((error)=>{
              alert(error);
          })
          navigation.navigate('GoaL List')
      }
      }




      
    return (
        <View style={{justifyContent: 'center',backgroundColor:'#90EE90'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:45,color:'#000000'}}>Create Diet Goal</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'#90EE90',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width: 375, height:175, }}source={require('../assets/UerGoalCreate.png')}  />
            </View>
        
            <View style={{alignItems: 'center', justifyContent: 'center',justifyContent:'space-between',paddingBottom:30,paddingTop:20 }}>
                <TextInput 
                    style={styles.input}
                    onChangeText={setAge}
                    value={age}
                    placeholder="Meal"
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
            
            <View style={{flexDirection:"row",paddingTop:0,paddingBottom:0,justifyContent: 'center'}}>
            <Text style={{ fontSize:20, fontWeight: '400',width:150,paddingTop:0}}>Healthy</Text>
            <RadioButton
               value="Healthy"
               status={ checked === 'Healthy' ? 'checked' : 'unchecked' }
               onPress={() => setChecked('Healthy')}
             />
           </View>

      <View style={{flexDirection:"row",justifyContent: 'center',paddingTop:15,}}>
      <Text style={{flexDirection:"row", fontSize:20, fontWeight: '400',width:150,}}>increase weight</Text>
      <RadioButton
        value="increase weight"
        status={ checked === 'increase weight' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('increase weight')}
       />
      </View>
          
      <View style={{flexDirection:"row",justifyContent: 'center',paddingTop:15,}}>
      <Text style={{flexDirection:"row", fontSize:20, fontWeight: '400',width:150}}>decrease weight</Text>
      <RadioButton
        value="decrease weight"
        status={ checked === 'decrease weight' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('decrease weight')}
       />
      </View>

                <View style={{paddingTop:10,width:200,textAlign:'center',alignSelf:'center',paddingBottom:80}}>

                <Button
                title="Submit"
                
                onPress={create}>
                  </Button>
                </View>

        </View>
    );

  

}
const styles = StyleSheet.create({
    input: {
      height: 40,
      width:230,
      margin: 12,
      borderWidth: 2,
      padding: 10,
      borderRadius:30,
      backgroundColor:'#ECECEC',
    },

  });