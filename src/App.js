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
    console.log(e.nativeEvent);
    if (e.nativeEvent.data === 'ShowCamera') this.showCamera();
  };

  onPressCapture = async () => {
    const capture = await this.camera.capture();
    const src = `"data:image/png;base64,${capture.data}"`;
    const jscode = `document.body.dispatchEvent(new CustomEvent('uploaded', { detail: { src: ${src} } }))`;
    this.webview.injectJavaScript(jscode);
    this.setState({ cameraView: false });
  };

  showCamera = () => this.setState({ cameraView: true });

  cameraRef = camera => (this.camera = camera);

  webviewRef = webview => (this.webview = webview);

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.cameraView ? (
          <CameraView onPress={this.onPressCapture} cameraRef={this.cameraRef} />
        ) : null}
        <WebView onMessage={this.onMessage} webviewRef={this.webviewRef} />
      </View>
    );
  }
}
