import React from 'react';
import {View, TextInput, StyleSheet, Text, Pressable} from 'react-native';
import {InputProps} from './interface';

const Input: InputProps = function Input({
  keyboardType,
  secure,
  labelHolder,
  value,
  onUpdateValue,
  onBlur,
  isInvalid,
  label,
  children,
  style,
  onPress,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{label}</Text>
      <Pressable style={style} onPress={onPress}>
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          placeholder={labelHolder}
          placeholderTextColor="gray"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          autoCapitalize="none"
          onBlur={onBlur}
          value={value}
          onChangeText={onUpdateValue}
          onFocus={onPress}
        />
        {children}
      </Pressable>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 12,
  },
  inputText: {
    fontSize: 14,
    fontWeight: '400',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 12,
    color: '#000000',
    borderColor: '#D0D5DD',
    borderWidth: 1,
    borderRadius: 8,
    minWidth: '100%',
  },
  inputInvalid: {
    borderColor: '#CB2222',
  },
});
