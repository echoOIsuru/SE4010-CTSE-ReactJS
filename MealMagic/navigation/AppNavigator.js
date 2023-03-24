import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import SignUpScreen from '../screens/SignUp';
import CategoriesScreen from '../screens/RecipeScreens/CategoriesScreen';
import RecipeScreen from '../screens/RecipeScreens/RecipeScreen';
import DashboardScreen from './../screens/RecipeScreens/DashboardScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Recipe Categories" component={CategoriesScreen} />
                <Stack.Screen name="Recipes List" component={RecipeScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
