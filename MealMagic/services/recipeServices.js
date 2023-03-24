import { firebase } from '../config'
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid-random';

const todoRef = firebase.firestore().collection('todo')

export const addRecipes = async (routeDetails, recipeName, ingredients, instructions, imageUrl, category) => {
    const db = getFirestore();
    const id = uuid(); // Generate a unique ID

    const storage = getStorage();


    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `recipes/images/${id}`);
    const metadata = { contentType: 'image/png' }; // set the content type explicitly
    const snapshot = await uploadBytes(storageRef, imageUrl, metadata);
    const imageUrls = await getDownloadURL(snapshot.ref);

    // Store the recipe data and the image URL in Firebase Database

    await addDoc(collection(db, `recipe/list/${routeDetails.uid}`), {
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        imageUrl: imageUrls,
        category: category,
    });

}

export const editRecipes = async (routeDetails, imageUrl, recipeName, ingredients, instructions, category, id, isUpdate) => {
    const storage = getStorage();

    const db = getFirestore();
    const recipeRef = doc(db, `recipe/list/${routeDetails.uid}`, id);

    // If a new image has been selected, upload it to Firebase Storage and get its URL
    let updatedImageUrl = imageUrl;
    if (updatedImageUrl) {
        const storageRef = ref(storage, `recipes/images/${id}`);
        const snapshot = await uploadBytes(storageRef, imageUrl);
        updatedImageUrl = await getDownloadURL(snapshot.ref);
    }

    function retnObj() {
        if (isUpdate == false) {
            let obj = {
                name: recipeName,
                ingredients: ingredients,
                instructions: instructions,
                imageUrl: updatedImageUrl,
                category: category,
            }
            return obj;
        }
        else {
            let obj2 = {
                name: recipeName,
                ingredients: ingredients,
                instructions: instructions,
                category: category,
            }
            return obj2;

        }
    }

    // Update the recipe data and the image URL in Firebase Realtime Database
    await updateDoc(recipeRef, retnObj());

};

export const deleteRecipes = async (routeDetails, id) => {

    const db = getFirestore();
    const recipeRef = doc(db, `recipe/list/${routeDetails.uid}`, id);
    await deleteDoc(recipeRef);

}

export const getRecipes = async (routeDetails, setRetrievedecipes, setRecipes) => {

    // Fetch all recipes from Firebase Firestore on component mount
    const db = getFirestore();
    const recipesRef = collection(db, `recipe/list/${routeDetails.uid}`);
    const unsubscribe = onSnapshot(recipesRef, (snapshot) => {
        const recipes = [];
        snapshot.forEach((doc) => {
            recipes.push({
                id: doc.id,
                name: doc.data().name,
                ingredients: doc.data().ingredients,
                instructions: doc.data().instructions,
                imageUrl: doc.data().imageUrl,
                category: doc.data().category
            });
        });
        console.log('gg', recipes)
        const results = recipes.filter(o =>
            Object.keys(o).some(k => o[k].toString().toLowerCase().includes(routeDetails.category.toLowerCase())));
        setRecipes(results);
        setRetrievedecipes(results);
    });

    // Unsubscribe from Firebase Firestore on component unmount
    return () => unsubscribe();
}

