import * as React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Box, HStack, Input, Text} from 'native-base';
import DarkButton from '../components/DarkButton';
import {login} from '../services/AccountService';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen(props) {
    const [loginForm, setLoginForm] = React.useState({
        emailAddress: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleLogin = () => {
        setIsSubmitting(true);
        if (
            loginForm.emailAddress.length === 0 ||
            loginForm.password.length === 0
        ) {
            Alert.alert('Error', 'Please enter a valid email address and password.');
            setIsSubmitting(false);
        } else {
            login(loginForm.emailAddress, loginForm.password).then(
                async (success) => {
                    await AsyncStorage.setItem('userToken', success.data.token);
                    setLoginForm({
                        emailAddress: '',
                        password: '',
                    });
                    setIsSubmitting(false);
                    if (props.onLogin) {
                        props.onLogin();
                    }
                },
                () => {
                    Alert.alert(
                        'Error',
                        "Looks like those details aren't correct. Please try again.",
                    );
                    setIsSubmitting(false);
                },
            );
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.loginBody}>
                <HStack alignItems="center">
                    <Text fontSize="20" fontWeight="bold">
                        Login
                    </Text>
                </HStack>

                <Text style={styles.subText}>
                    Welcome! Please login to your account below.
                </Text>

                <Box style={styles.loginFormItem} floatingLabel>
                    <Text>Email Address</Text>
                    <Input
                        value={loginForm.emailAddress}
                        keyboardType="email-address"
                        placeholder="Email address"
                        onChangeText={(text) => {
                            setLoginForm({...loginForm, emailAddress: text});
                        }}
                    />
                </Box>

                <Box style={styles.loginFormItem} floatingLabel>
                    <Text>Password</Text>
                    <Input
                        value={loginForm.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(text) => {
                            setLoginForm({...loginForm, password: text});
                        }}
                    />
                </Box>

                <DarkButton
                    text={'Login'}
                    onPress={handleLogin}
                    disabled={isSubmitting}
                />
            </View>
        </ScrollView>
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
