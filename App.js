import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Colors from './constants/Colors';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const Stack = createStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('userToken').then((userToken) => {
            if (userToken === null) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        });
    }, []);

    const loginStackScreen = () => {
        return (
            <LoginScreen
                onLogin={() => {
                    setIsLoggedIn(true);
                }}
            />
        );
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userDetails');
        setIsLoggedIn(false);
    };

    return isLoggedIn ? (
        <BottomTabNavigator ref={null} initialState={null} onLogout={logout}/>
    ) : (
        <NativeBaseProvider>
            <NavigationContainer ref={null} initialState={null}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginNavigator"
                        component={loginStackScreen}
                        options={{
                            title: 'QR Code Scanner',
                            headerStyle: {
                                backgroundColor: Colors.tintColor,
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
