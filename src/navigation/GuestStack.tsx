import {Platform, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';
import Login from '../screens/Login/Login';
import {IGuestStackParamList} from './interfaces';
import SignUp from '../screens/SignUp/SignUp';

const GuestStack = function GuestStack() {
  const Stack = createStackNavigator<IGuestStackParamList>();

  /*    
  This Stack represents screens that are 
  seen when users are not logged in yet
  */
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.FadeFromBottomAndroid, // Default transition
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => (
            <Pressable
              style={styles.headerLeftButton}
              onPress={() => navigation.replace('Login')}>
              <MaterialIcons
                name={
                  Platform.OS === 'ios' ? 'arrow-back-ios-new' : 'arrow-back'
                }
                size={24}
                color="black"
              />
            </Pressable>
          ),
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
    </Stack.Navigator>
  );
};

export default GuestStack;

const styles = StyleSheet.create({
  headerLeftButton: {
    marginLeft: 16,
    paddingVertical: 8,
  },
});
