import * as functions from 'firebase-functions';

import { FS_CIRCLE_USERS_DB } from './helpers/constants';
import { CircleUserDBKeys } from './helpers/dbKeys';
import { generateNotification } from './helpers/notificationGenerator';
import { NotificationTypes } from './helpers/enums';

export const handleCircleUserChanges = functions.firestore
  .document(`${FS_CIRCLE_USERS_DB}/{docId}`)
  .onWrite(async (change, context) => {
    try {
      // on create
      if (!change.before.exists && change.after.exists) {
        // send new user request to circle
        const document = change.after.data();

        // we need to send the receiver a notification

        const receiverID = document![CircleUserDBKeys.userAdded];

        return generateNotification(
          NotificationTypes.CircleRequestSent,
          receiverID
        );
      } else if (change.before.exists && change.after.exists) {
        // on update
        const document = change.after.data();
        const senderID = document![CircleUserDBKeys.userCircle];
        // check if accepted
        if (document![CircleUserDBKeys.status] === 'a') {
          return generateNotification(
            NotificationTypes.CircleRequestAccepted,
            senderID
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
