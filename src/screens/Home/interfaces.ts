import React from 'react';
import {IAuthStackParamList} from '../../navigation/interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type HomeScreenProps = React.FC<
  StackScreenProps<IAuthStackParamList, 'Home'>
>;
