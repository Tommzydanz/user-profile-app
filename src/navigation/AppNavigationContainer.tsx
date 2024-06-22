import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import GuestStack from './GuestStack';
import FlashMessage from 'react-native-flash-message';
import AuthStack from './AuthStack';
import {WhiteLoader} from '../components/Loader/Loader';
import { useAuth, useLoginMutation } from '@store/auth';

const AppNavigationContainer: React.FC<{}> = function AppNavigationContainer() {
  const {isLoading, auth} = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <WhiteLoader size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {auth ? <AuthStack /> : <GuestStack />}
      <FlashMessage />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
