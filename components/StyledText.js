import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[styles.text, props.style]} />;
}

const styles = StyleSheet.create({
  text: {
    //fontFamily: 'NunitoSansRegular',
  },
});
