import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {IGuestStackParamList} from '../../navigation/interfaces';

export type ISignUpProp = React.FC<
  StackScreenProps<IGuestStackParamList, 'SignUp'>
>;
