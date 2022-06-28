import React from 'react';
import {StyleSheet} from 'react-native';
import {Item, Input, Text, View} from 'native-base';

export default function InputText({
  onChangeText,
  onBlur,
  value,
  placeholder,
  label,
}) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Item regular>
        <Input
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      </Item>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
