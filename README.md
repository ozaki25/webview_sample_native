# webview_sample_native

## aタグによる遷移

- postMessageの受信により撮影画面が現れている
- 下半分はgoogleに遷移

![link](https://user-images.githubusercontent.com/10087419/38121768-3ddacef8-340c-11e8-811c-ff9a45817fc2.gif)

```js
  var link = document.getElementById('link');
  link.addEventListener('click', function(e) {
    e.preventDefault();
    window.postMessage('ShowCamera');
    setTimeout(function() { window.location.href = e.target.href });
  });
```

https://github.com/ozaki25/webview_sample_native/blob/postmessage_and_submit/src/components/WebView.js#L8-L13

## formのsubmit

- postMessageの受信により撮影画面が現れている
- 下半分はpost失敗のエラー画面
  - post先用意するのが面倒だった
  - エラーがでているということはpostできているということ
    - 画面には`cannot post /`って書いてある

![submit](https://user-images.githubusercontent.com/10087419/38121766-3da68bfc-340c-11e8-9e65-1c3e6d10abe3.gif)

```js
  var form = document.getElementById('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    window.postMessage('ShowCamera');
    setTimeout(function() { form.submit() });
  });
```

https://github.com/ozaki25/webview_sample_native/blob/postmessage_and_submit/src/components/WebView.js#L15-L20
