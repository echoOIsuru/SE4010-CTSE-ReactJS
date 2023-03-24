import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { dashboardStyles as styles } from '../../utils/styles';

const DashboardScreen = ({ route, navigation }) => {

    const [selectedComponent, setSelectedComponent] = useState(null);
    const user = route.params; //logged user id

    //list of components and image sources
    const getCategories = () => {
        return [
            {
                id: 1,
                name: 'Recipe Manager',
                image: require('../../assets/RecipeManager.jpg'),
                navigateTo: 'Recipe Categories'
            },
            {
                id: 2,
                name: 'Meal Planner',
                image: require('../../assets/MealPlan.jpg'),
                navigateTo: 'Meal Plan'
            },
            {
                id: 3,
                name: 'Grocery Manager',
                image: require('../../assets/Grocery.jpg'),
                navigateTo: '#'
            },
            {
                id: 4,
                name: 'Goal Planner',
                image: require('../../assets/Goal.jpg'),
                navigateTo: 'Creat Goal'
            },
        ];
    };

    //screen width
    const screenWidth = Dimensions.get('window').width;

    const categories = getCategories();

    //returns pairs of elements in the category array
    const pairs = categories.reduce((acc, curr, index) => {
        if (index % 2 === 0) {
            acc.push([curr]);
        } else {
            acc[acc.length - 1].push(curr); //retrieves the last array in pairs and adds the current element to it
        }
        return acc;
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {pairs.map((pair, index) => (
                    <View key={index} style={styles.cardPair}>
                        {pair.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => {
                                    setSelectedComponent(category);
                                    navigation.navigate(category.navigateTo, { uid: user.uid });
                                }}>
                                <Card style={[styles.card, { width: screenWidth / 2 - 10 }]}>
                                    <ImageBackground source={category.image} style={styles.cardImage}>
                                        <Text style={styles.imageText}>{category.name}</Text>
                                    </ImageBackground>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default DashboardScreen;
