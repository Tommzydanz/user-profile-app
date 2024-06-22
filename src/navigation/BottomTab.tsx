import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import colors from '../configs/colors.config';
import HomeScreen from '../screens/Home/HomeScreen';
import Profile from '../screens/Profile/Profile';
import { IBottomTabParamList } from './interfaces';

export default function BottomTab() {
  const Tab = createBottomTabNavigator<IBottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.white,
          position: 'absolute',
          paddingVertical: 12,
          marginHorizontal: 90,
          marginVertical: 50,
          borderRadius: 50, //add border top left radius
          shadowOpacity: 0.7,
          shadowOffset: {width: 0, height: 5},
          elevation: 3,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => null,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
          },
          
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null,
          tabBarIcon: ({color}) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
