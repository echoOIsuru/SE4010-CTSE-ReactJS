import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button, ActivityIndicator } from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { addMealPlan, updateMealPlan } from '../../services/meal_planner/api';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config'
import NavigationBar from '../../components/meal_planner/NavigationBar';


export default AddNewMealScreen = ({ route, navigation }) => {
    const user = route.params.uid;
    let tempUrl;
    let meal;
    try {
        if (route.params.id) {
            meal = route.params;
            tempUrl = meal.url

        }
    } catch (error) {

    }

    const [url, setUrl] = useState()

    const [imageUri, setImageUri] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false)

    const [name, setName] = useState('');

    const [uid, setUid] = React.useState(user);
    const [id, setId] = React.useState('');
    const [selectedDays, setSelectedDays] = React.useState([]);
    const [selectedMealCategory, setSelectedMealCategory] = React.useState([]);
    const [selectedDietary, setSelectedDietary] = React.useState([]);
    const [selecteRecipe, setSelecteRecipe] = React.useState([]);

    const [render, setRender] = useState(false)

    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);


    const [recipes, setRecipes] = useState([])

    // const data = [
    //     { key: '1', value: 'Mobiles' },
    //     { key: '2', value: 'Appliances' },
    //     { key: '3', value: 'Cameras' },
    //     { key: '4', value: 'Computers' },
    //     { key: '5', value: 'Vegetables' },
    //     { key: '6', value: 'Diary Products' },
    //     { key: '7', value: 'Drinks' },
    // ]

    const [data, setData] = useState([])

    const day = [
        { key: '1', value: 'Monday' },
        { key: '2', value: 'Tuesday' },
        { key: '3', value: 'Wednesday' },
        { key: '4', value: 'Thursday' },
        { key: '5', value: 'Friday' },
        { key: '6', value: 'Saturday' },
        { key: '7', value: 'Sunday' },
    ]

    const mealCategory = [
        { key: '1', value: 'Breakfast' },
        { key: '2', value: 'Lunch' },
        { key: '3', value: 'Dinner' },
        { key: '4', value: 'Snacks' },
    ]

    const dietaryRestrictions = [
        { key: '1', value: 'Vegetarian' },
        { key: '2', value: 'Gluten-free' },
        { key: '3', value: 'Low-carb' },
    ]


    useEffect(() => {
        const userRef = firebase.firestore().collection(`recipe/list/${uid}`)
        // const postsRef = userRef.doc();
        let index = 0;

        userRef.onSnapshot(querySnapshot => {
            const recipe = []
            querySnapshot.forEach(async (doc) => {
                const { category, imageUrl, ingredients, instructions, name } = doc.data()
                console.log(doc.data())
                recipe.push({
                    key: index,
                    value: name
                })
                index += 1;
            })
            console.log(recipe, "========CATOGORIES")
            setData(recipe)
            setRecipes(recipe)
            //setRender(true)
        })

    }, [])



    useEffect(() => {
        console.log(route.params, "=======mealdsaa data")
        setRender(false)
        if (meal) {

            setId(meal.id)
            setName(meal.name)
            setSelectedDays(meal.selectedDays)
            setSelecteRecipe(meal.selecteRecipe)
            setSelectedMealCategory(meal.selectedMealCategory)
            setSelectedDietary(meal.selectedDietary)
            setUrl(tempUrl)
            setRender(true)
        }
    }, [])


    const addMealPlanHandler = () => {

        console.log({ id, name, selectedDays, selectedMealCategory, selectedDietary, selecteRecipe, url }, "sdaasd")

        if (meal) {
            updateMealPlan(id, { name, selectedDays, selectedMealCategory, selectedDietary, selecteRecipe, url: url })
        } else {
            addMealPlan({ uid, name, selectedDays, selectedMealCategory, selectedDietary, selecteRecipe, url })
        }

        navigation.navigate('Meal Plan', { uid })
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };


    const uploadImage = async () => {
        setIsUploaded(true)
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const ref = firebase.storage().ref('meals').child(`images/${Date.now()}`);
        const snapshot = await ref.put(blob);
        const url2 = await snapshot.ref.getDownloadURL()

        console.log(url2, "+SSSSSSSSSSSSSSSSSSSS+++++=");
        if (url2 != '') {
            setUrl(url2)
            setIsUploaded(false)
        }
        //url = url2

    };

    return (
        <View style={styles.container}>

            <ScrollView >
                <View style={styles.logoContainer}>
                    <Image
                        source={render ? require("../../assets/edit.png") : require("../../assets/mealPlanLogo.png")}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.card}>
                        <ScrollView >
                            {
                                render ? (
                                    <>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Meal Name</Text>
                                            <TextInput
                                                style={styles.input}
                                                value={name}
                                                defaultValue={name}
                                                onChangeText={setName}
                                                placeholder="Name"
                                                placeholderTextColor="#999"
                                            />
                                        </View>

                                        {
                                            !one ? <View style={styles.inputContainer}>
                                                <Text style={styles.label} onPress={() => { setOne(true) }} >Days : </Text>
                                                {selectedDays.map((data) => (
                                                    <Text style={styles.label}>{data}</Text>
                                                ))}
                                            </View>
                                                :
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.label}>Days</Text>
                                                    <MultipleSelectList
                                                        defaultValue={selectedDays}
                                                        setSelected={(val) => setSelectedDays(val)}
                                                        data={day}
                                                        save="value"
                                                        onSelect={() => alert(selectedDays)}
                                                        label="Categories"
                                                    />
                                                </View>

                                        }
                                        {
                                            !two ? <View style={styles.inputContainer} >
                                                <Text style={styles.label} onPress={() => { setTwo(true) }}>Meal Category : </Text>
                                                <Text style={styles.label}>{selectedMealCategory}</Text>
                                            </View>
                                                :
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.label}>Meal Category</Text>
                                                    <SelectList
                                                        defaultValue={selectedMealCategory}
                                                        defaultOption={selectedMealCategory}
                                                        setSelected={(val) => setSelectedMealCategory(val)}
                                                        data={mealCategory}
                                                        save="value"
                                                    />
                                                </View>

                                        }
                                        {
                                            !three ? <View style={styles.inputContainer} >
                                                <Text style={styles.label} onPress={() => { setThree(true) }}>Dietary Restrictions : </Text>
                                                <Text style={styles.label}>{selectedDietary}</Text>
                                            </View>
                                                :

                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.label}>Dietary Restrictions</Text>
                                                    <SelectList
                                                        defaultValue={selectedDietary}
                                                        defaultOption={selectedDietary}
                                                        setSelected={(val) => setSelectedDietary(val)}
                                                        data={dietaryRestrictions}
                                                        save="value"
                                                    />
                                                </View>

                                        }
                                        {
                                            !four ? <View style={styles.inputContainer}>
                                                <Text style={styles.label} onPress={() => { setFour(true) }}>Recipes : </Text>
                                                {selecteRecipe.map((data) => (
                                                    <Text style={styles.label}>{data}</Text>
                                                ))}
                                            </View>
                                                :
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.label}>Recipes</Text>
                                                    <MultipleSelectList
                                                        defaultValue={selecteRecipe}
                                                        setSelected={(val) => setSelecteRecipe(val)}
                                                        data={data}
                                                        save="value"
                                                        onSelect={() => alert(selecteRecipe)}
                                                        label="Categories"
                                                    />
                                                </View>

                                        }


                                    </>)
                                    : (
                                        <>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>Meal Name</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    value={name}
                                                    defaultValue={name}
                                                    onChangeText={setName}
                                                    placeholder="Name"
                                                    placeholderTextColor="#999"
                                                />
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>Days</Text>
                                                <MultipleSelectList
                                                    defaultValue={selectedDays}
                                                    setSelected={(val) => setSelectedDays(val)}
                                                    data={day}
                                                    save="value"
                                                    onSelect={() => alert(selectedDays)}
                                                    label="Categories"
                                                />
                                            </View>

                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>Meal Category</Text>
                                                <SelectList
                                                    defaultValue={selectedMealCategory}
                                                    defaultOption={selectedMealCategory}
                                                    setSelected={(val) => setSelectedMealCategory(val)}
                                                    data={mealCategory}
                                                    save="value"
                                                />
                                            </View>

                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>Dietary Restrictions</Text>
                                                <SelectList
                                                    defaultValue={selectedDietary}
                                                    defaultOption={selectedDietary}
                                                    setSelected={(val) => setSelectedDietary(val)}
                                                    data={dietaryRestrictions}
                                                    save="value"
                                                />
                                            </View>

                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>Recipes</Text>
                                                <MultipleSelectList
                                                    defaultValue={selecteRecipe}
                                                    setSelected={(val) => setSelecteRecipe(val)}
                                                    data={data}
                                                    save="value"
                                                    onSelect={() => alert(selecteRecipe)}
                                                    label="Categories"
                                                />
                                            </View>
                                        </>)
                            }

                            <View style={styles.imgbutton}>
                                <Button title="Pick  an image" onPress={pickImage} />
                                {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
                                {imageUri && (
                                    <>
                                        {
                                            !isUploaded ?
                                                <Button title="Upload" onPress={uploadImage} /> :
                                                <ActivityIndicator size="large" color="red" />
                                        }
                                    </>
                                )
                                }
                            </View>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText} onPress={() => { addMealPlanHandler() }}>{render ? 'Update Meal Plan' : 'Add Meal Plan'}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>

            <NavigationBar />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 40,
        marginTop: 40,
        resizeMode: 'contain',
    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#000',
        marginBottom: 20,
        marginTop: 20,
    },
    card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#797979',
        color: '#333',
        paddingLeft: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    imgbutton: {
        marginBottom: 40
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
};

