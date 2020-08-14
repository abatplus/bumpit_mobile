//copyfile.js
const fs = require('fs');

// destination will be created or overwritten by default.
fs.copyFile(__dirname + '/App.entitlements', __dirname + '/../../ios/App/App/App.entitlements', (err) => {
    if (err) throw err;
    console.log('iOS entitlements have been set.');
});