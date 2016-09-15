# google-maps-news

## Test

You can test registration using broswer console:
```
AuthActions.register('loks', '1234', 'loks message').then(() => {
    console.log('Registration for "loks"` completed!');
});
```

You can test authentication using browser console:
```
AuthActions.login('loks', '1234').then(() => {
    console.log('Now loks is authenticated');
});
```

You can test private access using browser console:
```
ProfileAction.getInfo('loks');
```
