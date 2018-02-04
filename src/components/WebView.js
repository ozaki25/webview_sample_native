import React from 'react';
import { Platform, WebView } from 'react-native';

const uri = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const injectedJavaScript = `
  const inputFile = document.getElementById('input-file');
  inputFile.setAttribute('disabled', true);

  const fileSelectButton = document.getElementById('file-select');
  fileSelectButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.postMessage('ShowCamera');
  });
`;

export default ({ onMessage, webviewRef }) => (
  <WebView
    style={{ flex: 1 }}
    ref={webviewRef}
    source={{ uri }}
    onMessage={onMessage}
    injectedJavaScript={injectedJavaScript}
    javaScriptEnabledAndroid
  />
);
