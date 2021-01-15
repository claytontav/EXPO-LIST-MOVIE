import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import ListTask from './pages/ListTask';
import NewTask from './pages/NewTask';


export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{
                headerStyle: { backgroundColor: '#161a1d' },
                headerTintColor: '#fff',
            }}>
                <Screen name='ListTask' component={ ListTask } options={{ title: 'Lista' }} />
                <Screen name='NewTask' component={ NewTask } options={{ title: 'Novo Filme' }} />
            </Navigator>
        </NavigationContainer>
    );
}