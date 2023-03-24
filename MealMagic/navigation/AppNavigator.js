import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import GroceryHomeScreen from '../screens/IT20218058/GroceryHomeScreen';
import CreateGroceryScreen from '../screens/IT20218058/CreateGroceryScreen';
import ViewGroceryScreen from '../screens/IT20218058/ViewGroceryScreen';
import EditGroceryScreen from '../screens/IT20218058/EditGroceryScreen';
import SuggessionsScreen from '../screens/IT20218058/SuggessionsScreen';
import SignUpScreen from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Test" component={TestScreen} />

                {/* IT20218058 - Grocery Planning */}
                <Stack.Screen name="GroceryHome" component={GroceryHomeScreen} />
                <Stack.Screen name="CreateGrocery" component={CreateGroceryScreen} />
                <Stack.Screen name="ViewGrocery" component={ViewGroceryScreen} />
                <Stack.Screen name="EditGrocery" component={EditGroceryScreen} />
                <Stack.Screen name="Suggessions" component={SuggessionsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
