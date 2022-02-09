import { firestore, logger } from 'firebase-functions';

import { FS_USER_DB } from '../helpers/constants';
import { generateNotification } from '../helpers/notificationGenerator';
import { NotificationTypes } from '../helpers/enums';
import {
  handleDateChange,
  handleWishlistChange,
  sendWelcomeEmail
} from './handleChanges';
import { UserDBKeys } from '../helpers/dbKeys';

export const handleUserDataChange = firestore
  .document(`${FS_USER_DB}/{userId}`)
  .onWrite(async (change, context) => {
    try {
      let op = 'update';

      if (!change.after.exists) {
        op = 'delete';
      } else if (!change.before.exists) {
        op = 'create';
      }

      const { userId } = context.params;
      if (op === 'create') {
        const afterData = change.after.data();

        // Create welcome notification

        // send welcome mail from sendgrid
        if (afterData![UserDBKeys.isEmailVerified]) {
          sendWelcomeEmail(afterData);
        }

        await generateNotification(NotificationTypes.FirstRegister, userId, {});
      } else if (op === 'update') {
        const afterData = change.after.data();
        const beforeData = change.before.data();
        // check if dates are changed
        await handleDateChange(change, userId);

        // check if wishlist is changed
        await handleWishlistChange(change, userId);

        // send welcome mail from sendgrid if now
        // email verified has been updated
        if (
          afterData![UserDBKeys.isEmailVerified] &&
          !beforeData![UserDBKeys.isEmailVerified]
        ) {
          sendWelcomeEmail(afterData);
        }

        // update algolia if needed
      } else if (op === 'delete') {
        // mark user for deletion
      }
    } catch (e) {
      logger.log(e);
    }
  });
