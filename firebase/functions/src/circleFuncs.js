const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {
  FS_USER_DB,
  FS_USER_MYCIRCLE_DB,
  FS_USER_MEINWHOCIRCLE_DB
} = require('./constants');
const { CircleUserDBKeys, MeInWhosCircleDBKeys } = require('./dbKeys');

exports.handleAddOrRemoveToCirle = functions.firestore
  .document(`${FS_USER_DB}/{userID}/${FS_USER_MYCIRCLE_DB}/{inCircleUserID}`)
  .onWrite((change, context) => {
    console.log('Staring function');
    const { userID, inCircleUserID } = context.params;

    const col = admin
      .firestore()
      .collection(
        `${FS_USER_DB}/${inCircleUserID}/${FS_USER_MEINWHOCIRCLE_DB}`
      );
    console.log('Staring work');
    if (change.after.exists) {
      console.log('Data exists');

      // added new user to circle
      document = change.after.data();
      // add to otherUsers' meInWhosCircle collection
      return col.doc(userID).set({
        [MeInWhosCircleDBKeys.name]: document[CircleUserDBKeys.name],
        [MeInWhosCircleDBKeys.relationHow]: document[CircleUserDBKeys.relation]
      });
    } else {
      console.log('Data doesnt exists');
      // removed user from circle
      document = change.before.data();
      // remove to otherUsers' meInWhosCircle collection

      return col.doc(userID).delete();
    }
  });
