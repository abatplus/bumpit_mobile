//copyfile.js
const fs = require('fs');

// destination will be created or overwritten by default.
fs.copyFile(__dirname + '/project.pbxproj', __dirname + '/../../ios/App/App.xcodeproj/project.pbxproj', (err) => {
    if (err) throw err;
    console.log('iOS provisioning profile has been set.');
});