import { firebase } from '../../config'

const todoRef = firebase.firestore().collection('meals')

const addMealPlan = async (data) => {

    todoRef.add(data).then(res => {
        console.log(res.id)
    }).catch(e => {
        console.log(e)
    })

    console.log("DONE")
}

const removeMealPlan = async (data) => {

    todoRef.doc(data.id).delete().then(res => {
        console.log("Deleted")
    }).catch(e => {
        console.log(e)
    })
    console.log("DONE")
}

const updateMealPlan = async (id, data) => {
    console.log(id, "++++++++++++++++SDSDD")

    await todoRef.doc(id).update(
        {
            ...data
        }
    ).then(res => {
        console.log("Updated")
    }).catch(e => {
        console.log(e)
    })
}

// const viewMealPlans = async () => {

//     const render = false;

//     todoRef.onSnapshot(querySnapshot => {
//         const mealPlan = []
//         querySnapshot.forEach(async (doc) => {
//             const { name, selecteRecipe, selectedDays, selectedDietary, selectedMealCategory } = doc.data()

//             await mealPlan.push({
//                 id: doc.id,
//                 name,
//                 selecteRecipe,
//                 selectedDays,
//                 selectedDietary,
//                 selectedMealCategory
//             })
//         })
//         console.log(mealPlan, "========NAME")
//         return mealPlan
//     })

// }

const test = () => {
    return "FF"
}

const uploadImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const ref = firebase.storage().ref('meals').child(`images/${Date.now()}`);
    const snapshot = await ref.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    console.log(url);
};


export { addMealPlan, test, removeMealPlan, updateMealPlan, uploadImage }
