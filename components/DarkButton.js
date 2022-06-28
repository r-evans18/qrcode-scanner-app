import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';

export default function DarkButton({onPress, text, disabled = false}) {
  return (
    <Button
      block
      dark
      onPress={onPress}
      title={text}
      style={styles.button}
      disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
  },
  text: {
    marginLeft: 'auto',
    marginRight: 'auto',
    //fontFamily: 'NunitoSansRegular',
  },
});
