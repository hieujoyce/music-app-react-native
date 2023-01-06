import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, FC} from 'react';
import {COLOR} from '../types/const';
import Input from '../components/Input';
import {validateEmail} from '../utils';
import Toast from 'react-native-toast-message';
import {PropsPublicRouter} from '../routers/PublicRouter';
import {useAppDispatch} from '../redux/store';
import {login} from '../redux/user.slice';

interface errFormLogin {
  email: string;
  password: string;
}

const Login: FC<PropsPublicRouter> = ({navigation}) => {
  const [emailVale, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [errFormLogin, setErrFormLogin] = useState<errFormLogin>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    let error = {email: '', password: ''};
    if (emailVale === '') {
      error = {...error, email: 'Email không Được để trống'};
    }

    if (passwordValue === '') {
      error = {
        ...error,
        password: 'Password không Được để trống',
      };
    }
    if (error.email || error.password) {
      setErrFormLogin(error);
      return;
    }
    if (!validateEmail(emailVale) || passwordValue.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Tài khoản hoặc mật khẩu không chính xác.',
      });
      return;
    }
    dispatch(login({email: emailVale, password: passwordValue}));
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLOR.white, paddingTop: 30}}>
      <KeyboardAvoidingView behavior="position">
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../images/logo.png')}
            style={{height: 100, width: 100}}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
          <Text style={{color: COLOR.primary, fontWeight: '700', fontSize: 30}}>
            Music App
          </Text>
          <Text style={{color: COLOR.gray}}>
            I am happy to see you again. You can continue where you left off by
            loggin
          </Text>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Input
            lable="Email"
            iconName="mail"
            value={emailVale}
            setValue={setEmailValue}
          />
          <Text style={{color: 'red', fontSize: 12, marginBottom: 10}}>
            {errFormLogin.email}
          </Text>
          <Input
            lable="Password"
            iconName="lock-closed"
            passwordField={true}
            value={passwordValue}
            setValue={setPasswordValue}
          />
          <Text style={{color: 'red', fontSize: 12, marginBottom: 10}}>
            {errFormLogin.password}
          </Text>
        </View>
      </KeyboardAvoidingView>

      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: COLOR.primary,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text style={{color: COLOR.white, fontSize: 20}}>Login</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 30,
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: COLOR.gray}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: COLOR.primary,
                alignSelf: 'center',
                fontWeight: '600',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
//rnfes <ion-icon name="lock-closed"></ion-icon>
const styles = StyleSheet.create({});
