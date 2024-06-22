import React from 'react';
import {IAuthStackParamList, IBottomTabParamList} from '../../navigation/interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type IProfileProps = React.FC<
  StackScreenProps<IAuthStackParamList, 'Home'>
>;

export type ProfileRouteProp = RouteProp<IBottomTabParamList, 'Profile'>;