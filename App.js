import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';

const uri = 'http://localhost:3000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri }} />
      </View>
    );
  }
}
