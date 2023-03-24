import React from 'react'
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/meal_planner/SignUp';
import MealPlanScreen from '../screens/meal_planner/MealPlanScreen';
import AddNewMealScreen from '../screens/meal_planner/AddNewMealScreen';
import CategoriesScreen from '../screens/RecipeScreens/CategoriesScreen';
import RecipeScreen from '../screens/RecipeScreens/RecipeScreen';
import DashboardScreen from './../screens/RecipeScreens/DashboardScreen';
import Create from '../screens/UserGoal_Create';
import GoalList from '../screens/UserGoal_view';
import Update from '../screens/UserGoal_update';
import List from '../screens/UserGoalselectedlist';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Sign Up" component={SignUpScreen} />

                <Stack.Screen name="Meal Plan" component={MealPlanScreen} />
                <Stack.Screen name="Add Meal Plan" component={AddNewMealScreen} />


                <Stack.Screen name="Recipe Categories" component={CategoriesScreen} />
                <Stack.Screen name="Recipes List" component={RecipeScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />

      
                <Stack.Screen name="Creat Goal" component={Create} />
                <Stack.Screen name="Goal List" component={GoalList} />
                <Stack.Screen name="Update" component={Update} />
                <Stack.Screen name="List" component={List} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}
