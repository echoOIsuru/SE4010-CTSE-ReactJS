import { StyleSheet } from 'react-native';

export const recipeScreenStyles = StyleSheet.create({
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
    addButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      marginRight: 5
    },
});

export const recipeCategoryStyles = StyleSheet.create({
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