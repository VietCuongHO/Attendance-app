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
