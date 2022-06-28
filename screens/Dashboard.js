import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, HStack, Spinner, Text} from 'native-base';
import {ScrollView} from "react-native-gesture-handler";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import DarkButton from "../components/DarkButton";
import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAuthUserDetails} from "../services/AccountService";

export default function Dashboard(props) {
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({
        userDetails: {},
    });

    useEffect(() => {
        checkUserLoggedIn();
    }, [checkUserLoggedIn]);

    const checkUserLoggedIn = useCallback(async () => {
        setLoading(true);
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken + 'user Token')
        if (userToken === null) {
            setIsLoggedIn(false);
            setLoading(false);
        } else {
            setIsLoggedIn(true);
            await getUserDetails();
        }
    }, []);

    const getUserDetails = async () => {
        getAuthUserDetails().then(
            async (success) => {
                console.log(success.data)
                setUserDetails(success.data);
                await AsyncStorage.setItem('userDetails', JSON.stringify(success.data));
                setLoading(false);
            },
            async (er) => {
                setUserDetails({
                    error: true,
                });
                await AsyncStorage.removeItem('userDetails');
                await AsyncStorage.removeItem('userToken');
                setLoading(false);
            },
        );
    };

    return (
        <NativeBaseProvider>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                {isLoading ? (
                    <Spinner color="black"/>
                ) : (
                    <>
                        <View style={styles.loginBody}>

                            <Text fontSize={20} fontWeight={'bold'}>Hello {userDetails.userDetails.name},</Text>

                            <Text>Please find the QR scanner in the tab list at the bottom of the screen.</Text>

                            <DarkButton onPress={props.onLogout} text="Logout"/>

                        </View>
                    </>
                )}
            </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        padding: 15,
    },
    loginBody: {
        padding: 10,
    },
    subText: {
        marginTop: 10,
        marginBottom: 10,
    },
    loginFormItem: {
        marginTop: 10,
        marginBottom: 10,
    },
});
