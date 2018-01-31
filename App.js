import React, { Component } from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

const uri = 'http://localhost:3000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.state = { cameraView: false };
  }

  jsCode = () =>
    `
    const fileSelectButton = document.getElementById('file-select');
    fileSelectButton.addEventListener('click', function(e) {
      e.preventDefault();
      alert();
      this.setState({ cameraView: true });
    });
    `;

  render() {
    return (
      <View style={styles.container}>
        {this.state.cameraView ? (
          <View>
            <Text>カメラ画面</Text>
          </View>
        ) : (
          <WebView source={{ uri }} injectedJavaScript={this.jsCode()} />
        )}
      </View>
    );
  }
}
