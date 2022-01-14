import { firestore, logger } from 'firebase-functions';

import { FS_USER_DB } from '../helpers/constants';
import { generateNotification } from '../helpers/notificationGenerator';
import { NotificationTypes } from '../helpers/enums';
import { handleDateChange, handleWishlistChange } from './handleChanges';

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
        // Create welcome notification

        // send welcome mail from sendgrid

        await generateNotification(NotificationTypes.FirstRegister, userId, {});

        // Add data to algolia if needed
      } else if (op === 'update') {
        // check if dates are changed
        await handleDateChange(change, userId);

        // check if wishlist is changed
        await handleWishlistChange(change, userId);

        // update algolia if needed
      } else if (op === 'delete') {
        // mark user for deletion
      }
    } catch (e) {
      logger.log(e);
    }
  });
