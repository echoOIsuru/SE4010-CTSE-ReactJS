import React, {useState,useEffect} from 'react'
import { View, Text, Image,Button,TextInput, StyleSheet,Alert } from 'react-native';
import {firebase} from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
const Update=({route})=> {
    const navigation = useNavigation();
    const todoRef=firebase.firestore().collection('goals')
    const [age, setAge] = useState(route.params.item.age); 
    const [duration, setDuration] = useState(route.params.item.duration);
    const [checked, setChecked] =useState(route.params.item.checked); 
    
    // const[textHeading,onChangeHeadingText]=useState(route.params.item.name);
    
const update=()=>{
   
      todoRef
      .doc(route.params.item.id)
      .update({
          age:age,
          duration:duration,
          checked:checked,
      }).then(()=>{
         navigation.navigate('GoaL List')
         Alert.alert("Goal Updated ")
         
      }).catch((error)=>{
          alert(error.message)
      })

  
  }  
  
  
      
    return (
        <View style={{justifyContent: 'center',backgroundColor:'#90EE90'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:45,color:'#000000'}}>Goal</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'#90EE90',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width: 375, height:125, }}source={require('../assets/UerGoalCreate.png')}  />
            </View>

            <Text style={{ fontSize:30,fontWeight: '500',textAlign:'center',color:'#000000',paddingTop:10}}>Meal</Text>
<Text style={{ fontSize:30,fontWeight: '300',textAlign:'center',color:'#000000'}}>{age}</Text>

            <View style={{alignItems: 'center', justifyContent: 'center',justifyContent:'space-between',paddingBottom:30,paddingTop:20 }}>
            
 <Text style={{ fontSize:30,fontWeight: '500',textAlign:'center',color:'#000000'}}>Goal</Text>
 <Text style={{ fontSize:30,fontWeight: '300',textAlign:'center',color:'#000000'}}>{checked}</Text>
               
            </View>

            
            <View style={{alignItems: 'center', justifyContent: 'center',justifyContent:'space-between',paddingBottom:0,paddingTop:20 }}>
            
 <Text style={{ fontSize:30,fontWeight: '500',textAlign:'center',color:'#000000'}}>Time Period</Text>
 <Text style={{ fontSize:30,fontWeight: '300',textAlign:'center',color:'#000000'}}>{duration}</Text>
               
            </View>
            
            <View style={{flexDirection:"row",paddingBottom:0,backgroundColor:'#90EE90',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width: 175, height:175, }}source={require('../assets/UserGoal.png')}  />
            </View>

           

        </View>
    );

  

}
export default Update
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