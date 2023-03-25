import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { recipeCategoryStyles as styles} from '../../utils/styles'; 
import NavigationBar from '../../components/meal_planner/NavigationBar';

const CategoriesScreen = ({ route, navigation }) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const user = route.params;

    //list of the categories
    const getCategories = () => {
        return [
            {
                id: 1,
                name: 'Sri Lankan',
                image: require('../../assets/Srilankan.jpg'),
            },
            {
                id: 2,
                name: 'Italian',
                image: require('../../assets/Italian.jpg'),
            },
            {
                id: 3,
                name: 'Greek',
                image: require('../../assets/Greek.jpg'),
            },
            {
                id: 4,
                name: 'Thai',
                image: require('../../assets/Thai.jpg'),
            },
            {
                id: 5,
                name: 'Chinese',
                image: require('../../assets/Chinese.jpg'),
            },
            {
                id: 6,
                name: 'American',
                image: require('../../assets/American.jpg'),
            }
        ];
    };

    //get the screen width
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <ScrollView>
                {getCategories().map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        onPress={() => {
                            setSelectedCategory(category);
                             navigation.navigate('Recipes List', { category: category.name, uid: user.uid });
                        }}>
                        <Card style={[styles.card, { width: screenWidth }]}>
                            <ImageBackground source={category.image} style={styles.cardImage}>
                                <Text style={styles.imageText}>{category.name}</Text>
                            </ImageBackground>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <NavigationBar />
        </View>
    );
};

export default CategoriesScreen;
