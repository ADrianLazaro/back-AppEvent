// config/firebaseConfig.js

const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 storageBucket: 'imageneseventos-23049.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
