import React from 'react'
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import SignUpScreen from '../screens/SignUp';
import Create from '../screens/UserGoal_Create';
import GoalList from '../screens/UserGoal_view';
import Update from '../screens/UserGoal_update';
import List from '../screens/UserGoalselectedlist';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Creat Goal" component={Create} />
                <Stack.Screen name="Goal List" component={GoalList} />
                <Stack.Screen name="Update" component={Update} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Test" component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
