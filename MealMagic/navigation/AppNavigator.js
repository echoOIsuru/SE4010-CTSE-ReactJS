import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import SignUpScreen from '../screens/SignUp';
import MealPlanScreen from '../screens/meal_planner/MealPlanScreen';
import AddNewMealScreen from '../screens/meal_planner/AddNewMealScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Test" component={TestScreen} />

                <Stack.Screen name="Meal Plan" component={MealPlanScreen} />
                <Stack.Screen name="Add Meal Plan" component={AddNewMealScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}
