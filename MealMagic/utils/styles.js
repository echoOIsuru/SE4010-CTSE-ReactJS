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

export const dashboardStyles = StyleSheet.create({
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

export const mealPlanStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    eventList: {
        marginTop: 20,
        marginBottom: 20
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#F3FFE0'
    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        fontSize: 50,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventMonth: {
        fontSize: 16,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    description: {
        fontSize: 15,
        color: '#646464',
        width: 250,
    },
    eventTime: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#151515',
        marginBottom: 15
    },
    userName: {
        fontSize: 16,
        color: '#151515',
        alignSelf: 'center'
    },
    delete: {
        marginLeft: 2,
        fontSize: 35
    },
    add: {
        fontSize: 30,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
        right: 16,
        marginRight: 5
    },
    scontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    shorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

export const singInStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        height: 300,
        width: 300
    },
    inputView: {
        backgroundColor: "#ebf2c9",
        borderRadius: 30,
        width: "90%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        alignContent: 'center'
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#5BFF92",
    },
    signBtn: {
        width: "30%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#5BFF92",
    },
});

export const addMealPlanStylse = {
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