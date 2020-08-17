import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import Search from "../Components/Search";
import InstrumentDetail from "../Components/InstrumentDetail";

const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Rechercher"
            screenOptions={{ gestureEnabled: true }}
        >
            <Stack.Screen
                name="Rechercher"
                component={Search}
                options={{ title: 'Rechercher' }}
            />
            <Stack.Screen
                name="InstrumentDetail"
                component={InstrumentDetail}
                options={{ title: 'Detail de l\'instrument' }}
            />
        </Stack.Navigator>
    );
}

export default RootStack
