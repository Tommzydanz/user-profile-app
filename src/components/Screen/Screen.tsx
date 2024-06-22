import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import {ScreenProps} from './interfaces';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../configs/colors.config';

const getBarColor = (options: {statusBarColor?: string}): string => {
  const {statusBarColor} = options;
  if (statusBarColor) {
    return statusBarColor;
  }
  return colors.screen;
};

const Screen: React.FC<ScreenProps> = function Screen({
  children,
  statusBarStyle = 'dark-content',
  statusBarColor = colors.screen,
  style,
  translucentBar,
  keyboardAvoidingViewBehaviour = Platform.select({
    ios: 'padding',
    android: undefined,
  }),
}) {
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused ? (
        <StatusBar
          barStyle={statusBarStyle}
          translucent={translucentBar}
          backgroundColor={
            Platform.OS === 'android'
              ? getBarColor({statusBarColor})
              : undefined
          }
        />
      ) : null}
      {keyboardAvoidingViewBehaviour === 'none' ? (
        <View style={[styles.container, style]}>{children}</View>
      ) : (
        <KeyboardAvoidingView
          style={[styles.container, style]}
          behavior={keyboardAvoidingViewBehaviour}>
          {children}
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
  },
});

export default Screen;
