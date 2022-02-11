import { firestore, logger } from 'firebase-functions';

import { FS_USER_DB, FS_INVITATIONS_DB } from '../helpers/constants';
import { generateNotification } from '../helpers/notificationGenerator';
import { NotificationTypes } from '../helpers/enums';
import {
  handleDateChange,
  handleSendNotificationsFromInvitationList,
  handleWishlistChange,
  sendWelcomeEmail
} from './handleChanges';
import { UserDBKeys } from '../helpers/dbKeys';
import { user } from 'firebase-functions/v1/auth';

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
        generateNotification(NotificationTypes.FirstRegister, userId, {});

        // send welcome mail from sendgrid
        // only if first name is provided
        if (
          afterData![UserDBKeys.isEmailVerified] &&
          afterData![UserDBKeys.name]
        ) {
          sendWelcomeEmail(afterData);
        }

        // check if this email was in the invitations list
        // send notification to invitee that this person has joined
        // send notification to this person to add invitee to circle
        // only if name is present
        if (afterData![UserDBKeys.name]) {
          handleSendNotificationsFromInvitationList(change, userId);
        }
      } else if (op === 'update') {
        const afterData = change.after.data();
        const beforeData = change.before.data();
        // check if dates are changed
        await handleDateChange(change, userId);

        // check if wishlist is changed
        await handleWishlistChange(change, userId);

        // send welcome mail from sendgrid if now
        // email verified has been updated
        // or name has been provided
        // but both must be present before this call
        if (
          afterData![UserDBKeys.isEmailVerified] &&
          afterData![UserDBKeys.name] &&
          (!beforeData![UserDBKeys.isEmailVerified] ||
            !beforeData![UserDBKeys.name])
        ) {
          sendWelcomeEmail(afterData);
        }

        // check if this email was in the invitations list
        // send notification to invitee that this person has joined
        // send notification to this person to add invitee to circle
        // only if name was added in this update
        if (!beforeData![UserDBKeys.name] && afterData![UserDBKeys.name]) {
          handleSendNotificationsFromInvitationList(change, userId);
        }

        // algolia updates are now happening from separate cloud extention
      } else if (op === 'delete') {
        // mark user for deletion - this will happen earlier
        // TODO remove date entries from calendar DB of DOB and Rel
        // TODO remove wishlist entries from product data
      }
    } catch (e) {
      logger.log(e);
    }
  });
