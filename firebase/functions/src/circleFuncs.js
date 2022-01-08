const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const {
  FS_USER_DB,
  FS_USER_MYCIRCLE_DB,
  FS_USER_MEINWHOCIRCLE_DB,
  RDB_NOTIFICATIONS_DB
} = require('./constants');
const {
  CircleUserDBKeys,
  MeInWhosCircleDBKeys,
  NotificationDBKeys
} = require('./dbKeys');

exports.handleAddOrRemoveToCirle = functions.firestore
  .document(`${FS_USER_DB}/{userID}/${FS_USER_MYCIRCLE_DB}/{inCircleUserID}`)
  .onWrite(async (change, context) => {
    const { userID, inCircleUserID } = context.params;

    const col = admin
      .firestore()
      .collection(
        `${FS_USER_DB}/${inCircleUserID}/${FS_USER_MEINWHOCIRCLE_DB}`
      );

    if (change.after.exists) {
      // added new user to circle
      document = change.after.data();
      // add to otherUsers' meInWhosCircle collection

      // create a notification
      const notiID = uuidv4();
      const notiRef = admin
        .database()
        .ref(`${RDB_NOTIFICATIONS_DB}/${inCircleUserID}/${notiID}`);

      await col.doc(userID).set({
        [MeInWhosCircleDBKeys.name]: document[CircleUserDBKeys.name],
        [MeInWhosCircleDBKeys.relationHow]: document[CircleUserDBKeys.relation]
      });

      return notiRef.set({
        [NotificationDBKeys.type]: 'IC',
        [NotificationDBKeys.redirectLink]: `/profile/${userID}`,
        [NotificationDBKeys.text]:
          'Someone just added you in their circle. See who it is!',
        [NotificationDBKeys.seen]: false,
        [NotificationDBKeys.read]: false,
        // TODO add correct timestamp
        [NotificationDBKeys.createdTS]: 'time'
      });
    } else {
      // removed user from circle
      document = change.before.data();
      // remove to otherUsers' meInWhosCircle collection

      return col.doc(userID).delete();
    }
  });
