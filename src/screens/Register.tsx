import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, FC} from 'react';
import {COLOR} from '../types/const';
import Input from '../components/Input';
import {validateEmail} from '../utils';
//import Toast from 'react-native-toast-message';
import {PropsPublicRouter} from '../routers/PublicRouter';

interface errFormRegister {
  email: string;
  username: string;
  password: string;
  cfPassword: string;
}

const Register: FC<PropsPublicRouter> = ({navigation}) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [cfPasswordValue, setCfPasswordValue] = useState<string>('');
  const [errFormRegister, seterrFormRegister] = useState<errFormRegister>({
    email: '',
    username: '',
    password: '',
    cfPassword: '',
  });

  const handleSubmit = () => {
    let error = {email: '', username: '', password: '', cfPassword: ''};
    if (emailValue === '') {
      error = {...error, email: 'Email không Được để trống'};
    } else if (!validateEmail(emailValue)) {
      error = {...error, email: 'Email không đúng định dạng'};
    }

    if (usernameValue === '') {
      error = {
        ...error,
        username: 'Username không Được để trống',
      };
    } else if (emailValue.length < 6) {
      error = {
        ...error,
        username: 'Username không được nhỏ hơn 6 kí tự',
      };
    }

    if (passwordValue === '') {
      error = {
        ...error,
        password: 'Password không Được để trống',
      };
    } else if (emailValue.length < 6) {
      error = {
        ...error,
        password: 'Password không được nhỏ hơn 6 kí tự',
      };
    }

    if (cfPasswordValue !== passwordValue) {
      error = {
        ...error,
        cfPassword: 'Comfirm password không chính xác',
      };
    }

    if (error.email || error.password) {
      // console.log('Tài khoản hoặc mật khẩu không chính xác.');
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: 'Tài khoản hoặc mật khẩu không chính xác.',
      // });
      seterrFormRegister(error);
      return;
    }
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
            Hello, I guess you are new around here. You can start using the
            application after sign up.
          </Text>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Input
            lable="Email"
            iconName="mail"
            value={emailValue}
            setValue={setEmailValue}
          />
          <Text style={{color: 'red', fontSize: 12, marginBottom: 10}}>
            {errFormRegister.email}
          </Text>
          <Input
            lable="Username"
            iconName="person"
            value={usernameValue}
            setValue={setUsernameValue}
          />
          <Text style={{color: 'red', fontSize: 12, marginBottom: 10}}>
            {errFormRegister.username}
          </Text>
          <Input
            lable="Password"
            iconName="lock-closed"
            passwordField={true}
            value={passwordValue}
            setValue={setPasswordValue}
          />
          <Text style={{color: 'red', fontSize: 12, marginBottom: 10}}>
            {errFormRegister.password}
          </Text>
          <Input
            lable="Confirm Password"
            iconName="lock-closed"
            passwordField={true}
            value={cfPasswordValue}
            setValue={setCfPasswordValue}
          />
          <Text style={{color: 'red', fontSize: 12, marginBottom: 10}}>
            {errFormRegister.cfPassword}
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
          <Text style={{color: COLOR.white, fontSize: 20}}>Register</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: COLOR.primary,
                alignSelf: 'center',
                fontWeight: '600',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
