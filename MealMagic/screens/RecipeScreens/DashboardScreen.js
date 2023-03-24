import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';

const DashboardScreen = ({ route, navigation }) => {

    const [selectedComponent, setSelectedComponent] = useState(null);
    const user = route.params;

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
                navigateTo: '#'
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
                navigateTo: '#'
            },
        ];
    };

    const screenWidth = Dimensions.get('window').width;

    const categories = getCategories();
    const pairs = categories.reduce((acc, curr, index) => {
        if (index % 2 === 0) {
            acc.push([curr]);
        } else {
            acc[acc.length - 1].push(curr);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    cardPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    card: {
        height: 350,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 0,
    },
    cardImage: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 20,
        textAlign: 'center',
        fontSize: 18,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default DashboardScreen;
