import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthorizationHeader = async () => {
  const token = await AsyncStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default getAuthorizationHeader;
