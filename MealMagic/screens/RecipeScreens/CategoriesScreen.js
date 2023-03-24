import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';

const CategoriesScreen = ({ route, navigation }) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const user = route.params;

    useEffect(() => {
        console.log(user.uid, "UserID")
    }, [])

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
    card: {
        height: 350,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
        margin: 0,
      },
    cardImage: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    imageText: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 10,
        textAlign: 'center',
    },
});

export default CategoriesScreen;
