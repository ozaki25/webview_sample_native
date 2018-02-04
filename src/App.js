import React, { Component } from 'react';
import { View } from 'react-native';
import CameraView from './components/CameraView';
import WebView from './components/WebView';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cameraView: false };
  }

  onMessage = (e) => {
    const { data } = e.nativeEvent;
    if (data === 'ShowCamera') {
      this.showCamera();
    }
  };

  onPressCapture = async () => {
    const capture = await this.camera.capture();
    const src = `"data:image/png;base64,${capture.data}"`;
    this.webview.injectJavaScript(`document.body.dispatchEvent(new CustomEvent('uploaded', { detail: { src: ${src} } }))`);
    this.setState({ cameraView: false });
  };

  showCamera = () => this.setState({ cameraView: true });

  cameraRef = camera => (this.camera = camera);

  webviewRef = webview => (this.webview = webview);

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView onMessage={this.onMessage} webviewRef={this.webviewRef} />
        {this.state.cameraView ? (
          <CameraView onPress={this.onPressCapture} cameraRef={this.cameraRef} />
        ) : null}
      </View>
    );
  }
}
