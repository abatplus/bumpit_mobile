//copyfile.js
const fs = require('fs');

// destination will be created or overwritten by default.
fs.copyFile(__dirname + '/Info.plist', __dirname + '/../../ios/App/App/Info.plist', (err) => {
    if (err) throw err;
    console.log('iOS policies have been set.');
});