import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import PopuWindow from './PopupWindow';

export default CardView = (props) => {
    const [products, setProducts] = useState(props.data)

    addProductToCart = () => {
        Alert.alert('Success', 'The product has been added to your cart')
    }

    useEffect(() => {
        setProducts(props.data)
    }, [props.data])

    const openPopUp = () => {
        return ''
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={products}
                horizontal={false}
                numColumns={2}
                keyExtractor={item => {
                    return item.id
                }}
                ItemSeparatorComponent={() => {
                    return <View style={styles.separator} />
                }}
                renderItem={(post) => {
                    const item = post.item
                    return (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View>
                                    <View style={styles.socialBarContainer}>
                                        <View style={styles.socialBarSection}>
                                            <Text style={styles.title}> {item.name} </Text>
                                        </View>
                                        <View style={styles.socialBarSection}>
                                            <Text style={styles.left} > <PopuWindow item={item} /></Text>
                                        </View>
                                    </View>
                                    <Text style={styles.data}>
                                        <Text style={styles.price}>
                                            {"Dietary : "}
                                        </Text>
                                        {item.selectedDietary}
                                    </Text>
                                    <Text style={styles.data}>
                                        <Text style={styles.price}>
                                            {"Category : "}
                                        </Text>
                                        {item.selectedMealCategory}
                                    </Text>
                                    <Text style={styles.price}>
                                        {"Days of Week : "}
                                        {item.selectedDays.map((data) => {
                                            return (<Text style={styles.data}>
                                                {data + ",  "}
                                            </Text>)
                                        })}
                                    </Text>
                                    {/* <Text style={styles.price}>
                                        {"Recipies : "}
                                        {item.selecteRecipe.map((data) => {
                                            return (<Text style={styles.price}>
                                                {data + ",  "}
                                            </Text>)
                                        })}
                                    </Text> */}
                                </View>
                            </View>
                            <TouchableOpacity style={styles.cardImage} onPress={openPopUp}>
                                <Image style={styles.cardImage} source={{ uri: item.url }} />
                            </TouchableOpacity>
                            <View style={styles.cardFooter}>
                                <View style={styles.socialBarContainer}>
                                    <View style={styles.socialBarSection}>
                                        <TouchableOpacity
                                            style={styles.socialBarButton}
                                            onPress={() => { props.deleteMeal(item) }}>
                                            {/* <Image
                                                style={styles.icon}
                                                source={{
                                                    uri: 'https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png',
                                                }}
                                            /> */}
                                            <MaterialIcons style={styles.delete} name="delete" color='red' />
                                            <Text style={[styles.socialBarLabel, styles.buyNow]}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialBarSection}>
                                        <TouchableOpacity
                                            style={styles.socialBarButton}
                                            onPress={() => { props.updateMeal(item) }}>
                                            {/* <Image
                                                style={styles.icon}
                                                source={{ uri: 'https://icons8.com/icon/102544/add' }}
                                            /> */}
                                            <MaterialIcons style={styles.delete} name="edit" color='green' />
                                            <Text style={styles.socialBarLabel}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    delete: {
        fontSize: 25
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: '#E6E6E6',
    },
    listContainer: {
        alignItems: 'center',
    },
    left: {
        alignItems: 'flex-end',
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: 'white',
        flexBasis: '47%',
        marginHorizontal: 5,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        flex: 1,
        height: 140,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 20,
        flex: 1,
        fontWeight: '600',
        flexDirection: 'row',
        width: 400
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
    },
    data: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
    },
    buyNow: {
        color: 'purple',
    },
    icon: {
        width: 25,
        height: 25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})