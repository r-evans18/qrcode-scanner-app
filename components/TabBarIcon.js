import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={styles.icon}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: -3,
  },
});
