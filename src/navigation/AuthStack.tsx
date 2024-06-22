import {View, Text, Platform, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';
import {IAuthStackParamList} from './interfaces';

import EditProfile from '../screens/EditProfile/EditProfile';
import BottomTab from './BottomTab';

const AuthStack = function AuthStack() {
  const Stack = createStackNavigator<IAuthStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}>
      <Stack.Screen name="Home" component={BottomTab} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({navigation}) => ({
          headerLeft: () => (
            <Pressable
              style={styles.headerLeftButton}
              onPress={() => navigation.navigate('Profile')}>
              <MaterialIcons
                name={
                  Platform.OS === 'ios' ? 'arrow-back-ios-new' : 'arrow-back'
                }
                size={24}
                color="black"
              />
            </Pressable>
          ),
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  headerLeftButton: {
    marginLeft: 16,
    paddingVertical: 0,
  },
});
