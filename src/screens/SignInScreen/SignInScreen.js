import React, {useContext, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../assets/images/logoBK.png';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_login} from '../../api/user_api';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const onSignInPressed = () => {
    //validate user
    navigation.navigate('BottomTab');
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }
  };

  const handleLogin = async () => {
    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      user_login({
        name: email,
        password: password,
      })
        .then(result => {
          console.log(result);
          if (result.data.code === 200) {
            AsyncStorage.setItem('AccessToken', result.data.token);
            navigation.replace('BottomTab');
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert(checkPassowrd);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        {/* <Text>{val}</Text> */}
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          // onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          // onChangeText={setPassword}
          // secureTextEntry={true}
        />
        <CustomButton text="Sign In" onPress={handleLogin} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default SignInScreen;
