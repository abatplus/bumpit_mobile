//copyfile.js
const fs = require('fs');

// destination will be created or overwritten by default.
fs.copyFile(__dirname + '/ContactManager.java', __dirname + '/../../android/capacitor-cordova-android-plugins/src/main/java/org/apache/cordova/contacts/ContactManager.java', (err) => {
    if (err) throw err;
    console.log('Android ContactManager Plugin has been fixed.');
});