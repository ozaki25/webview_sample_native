import React from 'react';
import { StyleSheet, View } from 'react-native';
import Camera from 'react-native-camera';
import Button from './Button';

const styles = StyleSheet.create({
  camera: {
    flex: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ({ cameraRef, onPress }) => (
  <Camera
    ref={cameraRef}
    style={styles.camera}
    captureTarget={Camera.constants.CaptureTarget.memory}
    captureQuality={Camera.constants.CaptureQuality.low}
    playSoundOnCapture={false}
  >
    <View style={styles.buttonContainer}>
      <Button onPress={onPress}>撮影</Button>
    </View>
  </Camera>
);
