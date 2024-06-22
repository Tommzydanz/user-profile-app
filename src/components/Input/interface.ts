import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';

export type InputProps = React.FC<{
  keyboardType: KeyboardTypeOptions | KeyboardTypeOptions;
  secure?: boolean;
  labelHolder?: string;
  value?: string;
  onUpdateValue?: (value: string) => void;
  isInvalid?: boolean;
  label: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onPress?: () => void;
}>;
