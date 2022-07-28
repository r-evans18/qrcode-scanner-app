import React, {useState} from 'react';
import {Alert, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Input, Container, View, Text} from 'native-base';
import DarkButton from '../components/DarkButton';
import {ScrollView} from 'react-native-gesture-handler';

export default function ScanScreen() {
  const [enteredCode, setEnteredCode] = useState('');
  const [scanner, setScanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const onRead = (code) => {
    setLoading(true);
    Alert.alert('Code scanned',
        'The code is: ' . code,
        [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
              if (scanner) {
                scanner.reactivate();
              }
            },
          },
        ],
    )
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <QRCodeScanner
          style={styles.scanner}
          onRead={(e) => {
            onRead(e.data);
          }}
          ref={(node) => setScanner(node)}
          //flashMode={RNCamera.Constants.FlashMode.torch}
        />
        <View style={styles.paddedContainer}>
          <Text style={styles.h3}>Manual Entry</Text>

          <Text>Code</Text>
          <Input
            value={enteredCode}
            placeholder="Code..."
            onChangeText={(text) => {
              setEnteredCode(text);
            }}
          />
          <DarkButton
            text={'Validate Code'}
            onPress={() => {
              onRead(enteredCode);
            }}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
  h3: {
    paddingBottom: 10,
  },
  paddedContainer: {
    padding: 10,
    flex: 1,
  },
});
