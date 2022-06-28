import axios from 'axios';
import {API_URL} from '../constants/Api';
import {getToken} from './AccountService';

const scanUserCode = async (userCode) => {
  const token = await getToken();
  return axios.post(
    `${API_URL}/scan-usercode`,
    {
      userCode: userCode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export {scanUserCode};
