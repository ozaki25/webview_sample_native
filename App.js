import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';

const uri = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const jsCode = `
var inputFile = document.getElementById('input-file');
inputFile.setAttribute('disabled', true);
var fileSelectButton = document.getElementById('file-select');
fileSelectButton.addEventListener('click', function(e) {
  e.preventDefault();
  window.postMessage('ShowCamera');
});
`;

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

  showCamera = () => this.setState({ cameraView: true });

  showCamera = () => this.setState({ cameraView: true });

  render() {
    return (
      <View style={styles.container}>
        {this.state.cameraView ? (
          <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>カメラ画面</Text>
          </View>
        ) : (
          <WebView
            source={{ uri }}
            onMessage={this.onMessage}
            injectedJavaScript={jsCode}
            javaScriptEnabledAndroid
          />
        )}
      </View>
    );
  }
}
