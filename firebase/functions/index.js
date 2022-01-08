// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const { handleAddOrRemoveToCirle } = require('./src/circleFuncs');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.handleAddOrRemoveToCirle = handleAddOrRemoveToCirle;
