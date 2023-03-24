import React, { useEffect, useState, useRef, createRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Icon } from '@rneui/themed';
import { HStack, Button } from "@react-native-material/core";
import { VStack, Box, Divider, Avatar } from "@react-native-material/core";
import { firebase } from '../../config';

export default function ListView({ navigation }) {
  const [data, setData] = useState([

  ]);

  const lineRefs = React.useRef([]);
  lineRefs.current = data.map((_, i) => lineRefs.current[i] ?? createRef());

  const [modalVisible, setModalVisible] = useState(false);
  const buttonRef = useRef(null);
  const [buttonRefCourse, setButtonRefCourse] = useState(useRef([]));

  const [list, setList] = useState("My Grocery List");
  const [numberOfItems, setNumberOfItems] = useState(8);
  const [callParent, setCallParent] = useState(false);

  useEffect(() => {

    firebase.firestore().collection('grocery').onSnapshot((querySnapshot) => {
      const groceryList = []
      querySnapshot.forEach(async (doc) => {
        const { name, items } = doc.data()
        groceryList.push({
          id: doc.id,
          name,
          items
        })
      })
      setData(groceryList)
    })

  }, [modalVisible, callParent])


  const deleteConfirmation = (item) =>
    Alert.alert(
      "Confirmation",
      `Are you sure to delete ${item.name}`,
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => {
            firebase.firestore().collection('grocery').doc(item.id).delete().then((res) => {
              console.log("deleted")
            }).catch(e => {
              console.log(e)
            })
            console.log("done")
          }
        }
      ]
    );

  const viewInfo = (item) => {
    navigation.navigate('ViewGrocery', {
      id: item.id
    })
  }

  const editInfo = (item) => {
    navigation.navigate('EditGrocery', {
      id: item.id
    })
  }

  const showPopup = () => {
    let show = false;
    for (i = 0; i <= 1; i++) {
      setModalVisible(show)
      show = true;
    }

  }

  return (
    <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
      <View style={{ alignSelf: 'flex-start', padding: 20 }}>
        <HStack m={-10} spacing={150} >
          <Text style={{ fontSize: 22, color: 'black', marginTop: 15 }}>{list}</Text>
          <>
            <Icon
              raised
              name='plus'
              type='font-awesome'
              color='#3FBDAA'
              style={{ alignSelf: 'flex-end' }}
              onPress={() => navigation.navigate('CreateGrocery')} />
            {/* <Icon
                            raised
                            name='edit'
                            type='font-awesome'
                            color='#e10'
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => { buttonRef.current.alertToggle() }} /> */}
            {/* <UpdatePopupWindow ref={buttonRef} title={title} numberOfItems={numberOfItems} isTitle={title ? true : false} /> */}

          </>
        </HStack>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: '#F1F1F1' }}>
          {
            data.length != 0 && data.map((item, key) => (
              <VStack m={4} spacing={22} style={{ backgroundColor: "#E3F3F2" }} key={key}>
                <Box h={60}>
                  <HStack m={4}>
                    <Avatar label={item.name} autoColor />
                    <Text style={{ fontSize: 17, width: 250, color: 'black', alignSelf: 'center', paddingLeft: 10 }} onPress={() => { }}>{item.name}</Text>
                    {/* <UpdateFavoritePopups ref={lineRefs.current[key]} item={item} setCallParent={setCallParent} callParent={callParent} /> */}
                    <View style={styles.wrapper}>
                      <Icon style={styles.space}
                        // raised
                        name='info'
                        type='font-awesome'
                        color='#0514D1'
                        // style={{ alignSelf: 'flex-end' }}
                        onPress={() => viewInfo(item)} />
                      <Icon style={styles.space}
                        // raised
                        name='edit'
                        type='font-awesome'
                        color='#06831B'
                        // style={{ alignSelf: 'flex-end' }}
                        onPress={() => editInfo(item)} />
                      <Icon style={styles.space}
                        // raised
                        name='trash'
                        type='font-awesome'
                        color='#B73728'
                        // style={{ alignSelf: 'flex-end' }}
                        onPress={() => deleteConfirmation(item)} />
                    </View>

                  </HStack>
                </Box>
              </VStack>
            ))
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
    paddingTop: 15
  },
  space: {
    margin: 2,
    // paddingLeft: 5,
    // paddingRight: 5
  },
});
