import React from 'react';
import {ViewStyle, StyleProp, StatusBarStyle} from 'react-native';

export interface ScreenProps {
  children: React.ReactNode;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  style?: StyleProp<ViewStyle>;
  translucentBar?: boolean;
  keyboardAvoidingViewBehaviour?: 'height' | 'padding' | 'position' | 'none';
}
