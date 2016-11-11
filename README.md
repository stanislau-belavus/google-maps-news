# google-maps-news

## Require
`npm v 3.10.8`
`node v 6.5.0`
mongoDB

## Build
1. `npm i`
2. `npm run build` or `npm run watch` for start client
3. `npm run server-dev` or `npm run server` for start server
4. open `http://localhost:8081/#/home` as default route

## Auth test

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
ProfileActions.getInfo('loks');
```