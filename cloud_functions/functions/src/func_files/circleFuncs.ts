import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import {
  FS_USER_DB,
  FS_USER_MEINWHOCIRCLE_DB,
  FS_USER_MYCIRCLE_DB
} from './helpers/constants';
import { CircleUserDBKeys, MeInWhosCircleDBKeys } from './helpers/dbKeys';
import { generateNotification } from './helpers/notificationGenerator';
import { NotificationTypes } from './helpers/enums';

export const handleAddOrRemoveToCirle = functions.firestore
  .document(`${FS_USER_DB}/{userID}/${FS_USER_MYCIRCLE_DB}/{inCircleUserID}`)
  .onWrite(async (change, context) => {
    const { userID, inCircleUserID } = context.params;

    const col = admin
      .firestore()
      .collection(
        `${FS_USER_DB}/${inCircleUserID}/${FS_USER_MEINWHOCIRCLE_DB}`
      );

    let document = change.after.data();

    if (change.after.exists) {
      // added new user to circle
      document = change.after.data();
      // add to otherUsers' meInWhosCircle collection

      await col.doc(userID).set({
        [MeInWhosCircleDBKeys.name]: document![CircleUserDBKeys.name],
        [MeInWhosCircleDBKeys.relationHow]: document![CircleUserDBKeys.relation]
      });

      return generateNotification(
        NotificationTypes.AddedInCircle,
        inCircleUserID,
        { userID: userID }
      );
    } else {
      // removed user from circle
      document = change.before.data();
      // remove to otherUsers' meInWhosCircle collection

      return col.doc(userID).delete();
    }
  });
