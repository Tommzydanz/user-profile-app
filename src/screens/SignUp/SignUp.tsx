import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {MaterialIcons} from '@expo/vector-icons';
import Screen from '../../components/Screen/Screen';
import colors from '../../configs/colors.config';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {WhiteLoader} from '../../components/Loader/Loader';
import {ISignUpProp} from './interface';
import {useFormik} from 'formik';
import {signUpValidationSchema} from '../../utils/validationSchema.utils';
import { setCredential, useRegisterMutation } from '@store/auth';
import { notify, notifySuccess } from '@utils/notify';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@store/index';


const SignUp = () => {
  const {navigate} = useNavigation<any>();
  const headerHeight = useHeaderHeight();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [requestSignUp, {isLoading}] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const {values, ...formik} = useFormik({
    initialValues: { email: '', password: ''},
    validationSchema: signUpValidationSchema,
    onSubmit: () => handleLogin(),
  });

  const handleLogin = () => {
    requestSignUp(values).unwrap().then((response) => {
      console.log(response)
      dispatch(setCredential(response))
      notifySuccess("Signed Up Successsfully", "Welcome to your account")
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
        <Text style={styles.welcomeText}>Create an account</Text>
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
              name={passwordVisible ? 'visibility-off' : 'visibility'}
              size={14}
              color="black"
              style={{right: 20}}
              onPress={togglePasswordVisibility}
            />
          </Input>
          {formik.touched.password && formik.errors.password ? (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          ) : null}

          <Button onPress={formik.handleSubmit} disable={isLoading}>
            {isLoading ? <WhiteLoader /> : <Text>Sign Up</Text>}
          </Button>
          <View style={styles.switchContainer}>
            <Text>Have An Account?</Text>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => navigate('Login')}
              style={styles.highlight}>
              <Text style={{color: colors.primary}}> Log in</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SignUp;

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
    paddingTop: 20,
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
    marginBottom: 12,
  },
  label: {
    margin: 8,
  },
  pressed: {
    opacity: 0.4,
  },
  highlight: {
    backgroundColor: colors.white,
  },
  errorText: {
    color: 'red',
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
