import React from 'react';
import { Platform, WebView } from 'react-native';

// 実機の時はネットワークのIPを設定する
const uri = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const injectedJavaScript = `
  var link = document.getElementById('link');
  link.addEventListener('click', function(e) {
    e.preventDefault();
    window.postMessage('ShowCamera');
    setTimeout(function() { window.location.href = e.target.href });
  });

  var form = document.getElementById('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    window.postMessage('ShowCamera');
    setTimeout(function() { form.submit() });
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
