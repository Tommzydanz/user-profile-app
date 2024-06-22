import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import {loginValidationSchema} from '../../utils/validationSchema.utils';
import Screen from '../../components/Screen/Screen';
import colors from '../../configs/colors.config';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {WhiteLoader} from '../../components/Loader/Loader';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { setCredential, useLoginMutation } from '@store/auth';
import { notify, notifySuccess } from '@utils/notify';
import { useAppDispatch } from '@store/index';

const Login = () => {
  const { navigate } = useNavigation<any>();
  const headerHeight = useHeaderHeight();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [requestLogin, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const {values, ...formik} = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: () => handleLogin(),
  });

  const handleLogin = () => {
    requestLogin(values).unwrap().then((response) => {
      console.log(response)
      dispatch(setCredential(response))
      notifySuccess("Login Successsfull", "Welcome to your account")
    }).catch((error) => {
      console.log(error);
      notify("Authentication Failed", "Credentials did not match")
    })
  }

  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Screen
      statusBarStyle="dark-content"
      style={styles.screen}
      statusBarColor={colors.white}>
      <ScrollView
        style={[styles.container, {marginTop: headerHeight}]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <View style={styles.formContainer}>
          <Input
            keyboardType={'email-address'}
            label={'Email address'}
            labelHolder="Email address"
            isInvalid={formik.touched.email && !!formik.errors.email}
            onBlur={formik.handleBlur('email')}
            onUpdateValue={formik.handleChange('email')}
            value={values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          ) : null}
          <Input
            keyboardType={'default'}
            label={'Password'}
            labelHolder={'Password'}
            style={styles.passwordInput}
            isInvalid={formik.touched.password && !!formik.errors.password}
            onBlur={formik.handleBlur('password')}
            onUpdateValue={formik.handleChange('password')}
            value={values.password}
            secure={!passwordVisible}>
            <MaterialIcons
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={14}
              color="black"
              style={{right: 20}}
              onPress={togglePasswordVisibility}
            />
          </Input>
          {formik.touched.password && formik.errors.password ? (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          ) : null}
          <Button onPress={formik.handleSubmit} disabled={isLoading}>
            {isLoading ? <WhiteLoader /> : <Text>Log in</Text>}
          </Button>
          <View style={styles.switchContainer}>
            <Text>New Here?</Text>
            <TouchableHighlight
              underlayColor={'transparent'}
              style={styles.highlight}
              onPress={() => navigate("SignUp")}>
              <Text style={{color: colors.primary}}> Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  formContainer: {
    paddingTop: 40,
    marginBottom: 41,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
  highlight: {backgroundColor: colors.transparent},
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
});
