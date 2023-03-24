import { firebase } from '../config'

const todoRef = firebase.firestore().collection('todo')

const addMealPlan = async () => {
    let data = {
        "title": "asdasd",
        "sdfsdf": false
    }

    todoRef.add(data).then(res => {
        console.log(res.id)
    }).catch(e => {
        console.log(e)
    })

    console.log("DONE")
}

export { addMealPlan }
