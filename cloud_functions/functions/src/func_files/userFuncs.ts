import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  FS_EVENT_DATES_DB,
  FS_EVENT_DOB_DB,
  FS_EVENT_REL_DB,
  FS_USER_DB
} from './helpers/constants';
import { generateNotification } from './helpers/notificationGenerator';
import { NotificationTypes } from './helpers/enums';
import { UserDBKeys } from './helpers/dbKeys';
import { createDateString } from './helpers/utils';

export const handleUserDataChange = functions.firestore
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
        // check if update was in dates, then update calendar
        const beforeData = change.before.data();
        const afterData = change.after.data();

        const changePromises = [];

        if (beforeData![UserDBKeys.dob] !== afterData![UserDBKeys.dob]) {
          // Removing from previous date if exists
          if (beforeData![UserDBKeys.dob]) {
            const dateRemoveString = createDateString(
              beforeData![UserDBKeys.dob]
            );
            const dobRemRef = admin
              .firestore()
              .collection(
                `${FS_EVENT_DATES_DB}/${dateRemoveString}/${FS_EVENT_DOB_DB}`
              );
            changePromises.push(dobRemRef.doc(userId).delete());
          }

          // Adding to new date
          const dateAddString = createDateString(afterData![UserDBKeys.dob]);

          const dobAddRef = admin
            .firestore()
            .collection(
              `${FS_EVENT_DATES_DB}/${dateAddString}/${FS_EVENT_DOB_DB}`
            );

          changePromises.push(
            dobAddRef.doc(userId).set({
              [UserDBKeys.name]: afterData![UserDBKeys.name]
            })
          );
        }
        if (
          beforeData![UserDBKeys.relDate] !== afterData![UserDBKeys.relDate]
        ) {
          // Removing from previous date if exists
          if (beforeData![UserDBKeys.relDate]) {
            const dateRemoveString = createDateString(
              beforeData![UserDBKeys.relDate]
            );
            const relRemRef = admin
              .firestore()
              .collection(
                `${FS_EVENT_DATES_DB}/${dateRemoveString}/${FS_EVENT_REL_DB}`
              );
            changePromises.push(relRemRef.doc(userId).delete());
          }

          // Adding to new date
          const dateAddString = createDateString(
            afterData![UserDBKeys.relDate]
          );

          const relAddRef = admin
            .firestore()
            .collection(
              `${FS_EVENT_DATES_DB}/${dateAddString}/${FS_EVENT_REL_DB}`
            );

          changePromises.push(
            relAddRef.doc(userId).set({
              [UserDBKeys.name]: afterData![UserDBKeys.name]
            })
          );
        }

        await Promise.all(changePromises);

        // update algolia if needed
      } else if (op === 'delete') {
        // mark user for deletion
      }
    } catch (e) {
      console.log(e);
    }
  });
