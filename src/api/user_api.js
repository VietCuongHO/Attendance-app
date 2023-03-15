import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const user_login = async data => {
  try {
    const result = await ApiManager('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer API_KEY',
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.info(error, error.response && error.response.data);
    return error.response.data;
  }
};

export const user_logout = async () => {
  try {
    const token = AsyncStorage.getItem('AccessToken');
    if (token !== null) {
      const result = await ApiManager('/logout', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        AsyncStorage.removeItem('AccessToken');
        console.log(result);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.info(error, error.response && error.response.data);
    return false;
  }
};
