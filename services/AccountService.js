import axios from 'axios';
import { API_URL } from '../constants/Api';
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = (emailAddress, password) => {
  return axios.post(`${API_URL}/auth/login`, {
    email: emailAddress.toLowerCase(),
    password: password,
  });
};

const getAuthUserDetails = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log(userToken)
  return axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};


export { login, getAuthUserDetails };
