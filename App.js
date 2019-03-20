import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';
import {HomeScreen} from './screens/HomeScreen'
import {DetailsScreen} from "./screens/DetailsScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Detail: DetailsScreen });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack
    },
    {
        initialRouteName: 'App',
    }
));
