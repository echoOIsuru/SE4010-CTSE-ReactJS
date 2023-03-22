import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import { Text } from 'react-native-elements';

export default function CreateGroceryScreen({ navigation }) {

    const [inputFields, setInputFields] = useState([
        { ingredient: '', amount: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;

        console.log(data)
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { ingredient: '', amount: '' }
        let x = [...inputFields, newfield]
        console.log("////", x)
        setInputFields([...inputFields, newfield])
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
        navigation.navigate('Suggessions')
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <View>
            <Text h4>Crete Grocery List</Text>

            {inputFields.map((input, index) => {
                return (
                    <View key={index}>
                        <TextInput
                            name='ingredient'
                            placeholder='Ingredient'
                            // value={input.ingredient}
                            onChange={event => handleFormChange(index, event)}
                        />
                        <TextInput
                            name='amount'
                            placeholder='Amount'
                            // value={input.amount}
                            onChange={event => handleFormChange(index, event)}
                        />
                        <Button
                            title='Remove'
                            onPress={() => removeFields(index)}
                        />
                    </View>
                );
            })}

            <Button 
                title='Add more...'
                onPress={addFields}
            />

                <Button
                    title="Save"
                    onPress={submit}
                />

        </View>
    )
}
