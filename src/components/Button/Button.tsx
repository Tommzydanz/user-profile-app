import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {IButtonProps} from './interfaces';
import colors from '../../configs/colors.config';

const Button: IButtonProps = function Button({children, onPress, style}) {
  return (
    <View style={[styles.rootContainer, {marginTop: '80%'}, style]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) =>
          pressed
            ? [
                styles.pressed,
                styles.buttonContainer,
                {backgroundColor: colors.rippleColor},
              ]
            : [styles.buttonContainer, {backgroundColor: colors.primary}]
        }
        android_ripple={{color: colors.rippleColor}}>
        <Text style={[styles.buttonText, {color: colors.white}]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
