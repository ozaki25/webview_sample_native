import React, { Component } from 'react';
import { Platform, StyleSheet, View, WebView } from 'react-native';
import Camera from 'react-native-camera';
import Button from './components/Button';

const uri = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

const jsCode = file => `
var inputFile = document.getElementById('input-file');
inputFile.setAttribute('disabled', true);
var fileSelectButton = document.getElementById('file-select');
fileSelectButton.addEventListener('click', function(e) {
  e.preventDefault();
  window.postMessage('ShowCamera');
});
localStorage.setItem('src', ${JSON.stringify(file)});
document.body.dispatchEvent(new CustomEvent('uploaded'));
`;
// document.body.dispatchEvent(new CustomEvent('uploaded', { detail: { src: '${file}' } }));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cameraView: false, file: '' };
  }

  onMessage = (e) => {
    const { data } = e.nativeEvent;
    if (data === 'ShowCamera') {
      this.showCamera();
    }
  };

  onPressCapture = async () => {
    this.capture = await this.camera.capture();
    this.setState({ cameraView: false, file: this.capture.data });
  };

  showCamera = () => this.setState({ cameraView: true });

  renderCamera = () => (
    <Camera
      ref={(camera) => {
        this.camera = camera;
      }}
      style={styles.camera}
      captureTarget={Camera.constants.CaptureTarget.memory}
    >
      <View style={styles.buttonContainer}>
        <Button onPress={this.onPressCapture}>撮影</Button>
      </View>
    </Camera>
  );

  renderWebView = () => (
    <WebView
      source={{ uri }}
      onMessage={this.onMessage}
      injectedJavaScript={jsCode(this.state.file)}
      javaScriptEnabledAndroid
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.cameraView ? this.renderCamera() : this.renderWebView()}
      </View>
    );
  }
}
