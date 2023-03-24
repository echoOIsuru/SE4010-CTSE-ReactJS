import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Modal, View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar, Card, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { addRecipes, editRecipes, getRecipes, deleteRecipes } from '../../services/recipeServices';

const RecipeScreen = ({ route }) => {
  const [recipes, setRecipes] = useState([]);
  const [retrievedRrecipes, setRetrievedecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setID] = useState('');
  const [isImageSelected, setImageSelected] = useState(true);
  const routeDetails = route.params;

  useEffect(() => {
    getRecipes(routeDetails, setRetrievedecipes, setRecipes);
  }, []);


  const options = [
    { label: 'Sri lankan', value: 'Sri lankan' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Thai', value: 'Thai' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Greek', value: 'Greek' },
    { label: 'American', value: 'American' },
  ];

  const handleValueChange = (value) => {
    setCategory(value);
  };

  const addRecipe = async () => {

    await addRecipes(routeDetails, recipeName, ingredients, instructions, imageUrl, category);

    setModalVisible(false);
    setIsAdd(false);

    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setCategory('');
    setImageUrl('');
    setSelectedImage('')
  };

  const editRecipe = async () => {

    await editRecipes(routeDetails, imageUrl, recipeName, ingredients, instructions, category, id, isUpdate)

    setModalVisible(false)
    setIsUpdate(false);
    setImageSelected(true);
    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setCategory('');
    setImageUrl('');
    setSelectedImage('')
  };

  const deleteRecipe = async (id) => {

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => { // declare onPress as async function
            await deleteRecipes(routeDetails, id)
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission not granted');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Read the image data from the selected image file
      const response = await fetch(result.uri);
      const imageData = await response.blob();


      setSelectedImage(result.uri);
      setIsUpdate(false);
      setImageUrl(imageData);
      setImageSelected(true);
    }
  };


  const onChangeSearch = (query) => {

    if (query != null) {
      const results = retrievedRrecipes.filter(o =>
        Object.keys(o).some(k => o[k].toString().toLowerCase().includes(query.toLowerCase())));
      setRecipes(results);
    }

  };

  const handleCancel = () => {
    setModalVisible(false);
    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setCategory('');
    setImageUrl('');
    setSelectedImage('');
  }

  const renderItem = ({ item }) => {
    if (recipes.length === 0) {
      return null; // or return a message like "No records found"
    }

    return (

      <View>
        <Text>{'\n'}</Text>

        <View>
          <ScrollView>
            {

              <Card key={item.id}>
                <Card.Cover source={{ uri: item.imageUrl }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Card.Title title={item.name} />
                  <View style={{ flexDirection: 'row', marginRight: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => {
                      setRecipeName(item.name);
                      setIngredients(item.ingredients);
                      setInstructions(item.instructions);
                      // editRecipe(item.id, recipeName, ingredients, instructions, category);
                      setID(item.id);
                      setImageSelected(false);
                      setRecipeName(item.name);
                      setIngredients(item.ingredients);
                      setInstructions(item.instructions);
                      setImageUrl(item.imageUrl);
                      setCategory(item.category)
                      setIsUpdate(true);
                      setIsAdd(false);
                      setModalVisible(true);
                    }}>
                      <Icon name='pencil' type='material-community' size={20} color='green' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
                      <Icon name='delete' type='material-community' size={20} color='red' />
                    </TouchableOpacity>
                  </View>
                </View>
                <Card.Content>
                  <Paragraph>Ingredients: {item.ingredients}</Paragraph>
                  <Paragraph>Instructions: {item.instructions}</Paragraph>
                </Card.Content>
              </Card>

            }
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../../assets/food-background.jpeg')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', paddingHorizontal: 10, opacity: 0.7 }}>
      <View style={{ padding: 10, borderRadius: 10, marginBottom: 20 }}>
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#32CD32', borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' }}>{isAdd ? 'Add Recipe' : 'Edit Recipe'}</Text><Text>{'\n'}</Text>
              <TouchableOpacity onPress={handleImageUpload} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10 }}>
                <Text style={{ color: '#2e8b57', textAlign: 'center' }}>Select an Image*</Text>
              </TouchableOpacity>
              {selectedImage &&
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10 }} />
                </View>
              }
              {!isImageSelected && imageUrl &&
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10 }} />
                </View>
              }
              <Text>{'\n'}</Text>
              <TextInput
                placeholder='Recipe name*'
                value={recipeName}
                onChangeText={(text) => setRecipeName(text)}
                style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10, marginBottom: 10 }}
              />

              <View>

                <Picker selectedValue={category} onValueChange={handleValueChange} style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10, marginBottom: 10 }}>
                  <Picker.Item label="Select a recipe category*" value={null} enabled={false} />

                  {options.map((option) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                  ))}
                </Picker>

              </View>

              <TextInput
                placeholder='Ingredients*'
                value={ingredients}
                onChangeText={(text) => setIngredients(text)}
                style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10, marginBottom: 10 }}
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                placeholder='Instructions*'
                value={instructions}
                onChangeText={(text) => setInstructions(text)}
                style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10, marginBottom: 20 }}
                multiline={true}
                numberOfLines={4}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, margin: 10 }}
                >
                  <Text style={{ color: '#2e8b57' }}>Cancel</Text>
                </TouchableOpacity>

                {imageUrl && recipeName && ingredients && instructions && category !== "" ?
                  <TouchableOpacity
                    onPress={isAdd ? addRecipe : editRecipe}
                    style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, margin: 10 }}
                  >
                    <Text style={{ color: '#2e8b57' }}>Submit</Text>
                  </TouchableOpacity>
                  : null}
              </View>

            </View>
          </View>
        </Modal>
      </View>

      <Searchbar
        placeholder='search'
        value={searchQuery}
        onChangeText={(event) => {
          setSearchQuery(event);
          onChangeSearch(event);
        }}
      />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ paddingHorizontal: 10 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {
        setIsAdd(true);
        setCategory(routeDetails.category)
        setIsUpdate(false);
        setModalVisible(true)
      }}>
        <Ionicons
          name="add-circle-outline"
          size={64}
          color="green"
          style={{ textShadowColor: '#fff', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 1 }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  itemImage: {
    backgroundColor: 'white',
    width: "70%",
    height: "70%",
    borderRadius: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  }
});


export default RecipeScreen;
