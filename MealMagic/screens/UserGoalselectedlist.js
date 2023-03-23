import * as React from 'react';
import { View, Text, Image,Button,Alert,ScrollView,StyleSheet, Pressable, } from 'react-native';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation, validatePathConfig } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/core";
import {firebase} from '../config';
import { QuerySnapshot } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
export default function List({route}) {
    
    const [items, setItems] = useState([]);
    //  const [checked, setChecked] =useState(route.params.item.checked); 
    const Ref=firebase.firestore().collection('goals')
    const navigation = useNavigation();
    const isFocused = useIsFocused();
   const [it, setIt] = useState(route.params.item.checked);


useEffect(()=>{
    return Ref.onSnapshot(
        querySnapshot=>{
            
            const items=[]
            querySnapshot.forEach((doc)=>{
                const{age,checked,duration,}=doc.data()
                items.push({
                    id:doc.id,
                    age,
                    checked,
                    duration
                })
            })
            setItems(items)
        }
    )
    
    },[])
    


    return (
      <ScrollView>
        
        
        <View style={{backgroundColor:'white'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:25,color:'#000000'}}>Goal List</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'white',paddingBottom:20}}>
            <Image style={{width: 375, height:175, }}source={require('../assets/UerGoalCreate.png')}  />
            </View>
            
            <View style={{flexDirection:"row",paddingBottom:10,justifyContent:'center',alignItems:'center',backgroundColor:'#ECECEC'}}>
            <Text style={{ fontSize:20, fontWeight: '400',width:50,marginLeft:35}}>Age</Text>   
            <Text style={{ fontSize:20, fontWeight: '400',width:85,marginLeft:25}}>Duration</Text>
            <Text style={{ fontSize:20, fontWeight: '400',width:50,marginLeft:40}}>Goal</Text>
            <Text style={{ fontSize:20, fontWeight: '400',width:100,marginLeft:40,}}>Action</Text>

           
            </View>
            
            {items.map(item => (
            
         
            <View style={{flexDirection:"row",paddingBottom:20,alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'white',paddingBottom:20,paddingTop:20}} key={item.id}>
            <Text style={{ fontSize:20, fontWeight: '400',width:50,marginLeft:20}}>{item.age}</Text>  
            <Text style={{ fontSize:20, fontWeight: '400',width:100,marginLeft:20}}>{item.duration}</Text>  
           <Text style={{ fontSize:20, fontWeight: '400',width:100,marginLeft:15}}>{item.checked}</Text> 

        
       

            </View>
        ))}

    </View>
    </ScrollView>
)
}

