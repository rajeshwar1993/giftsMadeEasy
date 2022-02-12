import { Change, firestore } from 'firebase-functions';
import { InvitationsDBKeys, UserDBKeys } from '../helpers/dbKeys';
import { createDateString } from '../helpers/utils';
import * as admin from 'firebase-admin';
import {
  FS_EVENT_DATES_DB,
  FS_EVENT_DOB_DB,
  FS_EVENT_REL_DB,
  FS_PRODUCTS_INUSERWISHLIST_DB,
  FS_PRODUCTS_DB,
  FS_INVITATIONS_DB
} from '../helpers/constants';
import { generateNotification } from '../helpers/notificationGenerator';
import { NotificationTypes } from '../helpers/enums';

export const handleDateChange = async (
  change: Change<firestore.DocumentSnapshot>,
  userId: string
) => {
  // check if update was in dates, then update calendar
  const beforeData = change.before.data();
  const afterData = change.after.data();

  const changePromises = [];

  if (beforeData![UserDBKeys.dob] !== afterData![UserDBKeys.dob]) {
    // Removing from previous date if exists
    if (beforeData![UserDBKeys.dob]) {
      const dateRemoveString = createDateString(beforeData![UserDBKeys.dob]);
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
      .collection(`${FS_EVENT_DATES_DB}/${dateAddString}/${FS_EVENT_DOB_DB}`);

    changePromises.push(
      dobAddRef.doc(userId).set({
        [UserDBKeys.name]: afterData![UserDBKeys.name]
      })
    );
  }
  if (beforeData![UserDBKeys.relDate] !== afterData![UserDBKeys.relDate]) {
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
    const dateAddString = createDateString(afterData![UserDBKeys.relDate]);

    const relAddRef = admin
      .firestore()
      .collection(`${FS_EVENT_DATES_DB}/${dateAddString}/${FS_EVENT_REL_DB}`);

    changePromises.push(
      relAddRef.doc(userId).set({
        [UserDBKeys.name]: afterData![UserDBKeys.name]
      })
    );
  }

  await Promise.all(changePromises);
};

export const handleWishlistChange = async (
  change: Change<firestore.DocumentSnapshot>,
  userId: string
) => {
  // check if update was in wishlist,
  // then update that product inUserWishlist collection
  const beforeData = change.before.data();
  const afterData = change.after.data();
  // find out whether there was any update in wishlist
  if (
    beforeData![UserDBKeys.wishlist].length ===
    afterData![UserDBKeys.wishlist].length
  ) {
    return;
  }

  if (
    beforeData![UserDBKeys.wishlist].length >
    afterData![UserDBKeys.wishlist].length
  ) {
    // case where we are removing wishlist
    const larger: Array<string> = beforeData![UserDBKeys.wishlist];
    const smaller: Array<string> = afterData![UserDBKeys.wishlist];

    const missingProduct = larger.filter(id => !smaller.includes(id));

    if (missingProduct.length === 1) {
      // remove from product wishlist collection

      const productID = missingProduct[0];

      const collRef = admin
        .firestore()
        .collection(
          `${FS_PRODUCTS_DB}/${productID}/${FS_PRODUCTS_INUSERWISHLIST_DB}`
        );

      await collRef.doc(userId).delete();
    }
  } else {
    // case where we are adding wishlist
    const smaller: Array<string> = beforeData![UserDBKeys.wishlist];
    const larger: Array<string> = afterData![UserDBKeys.wishlist];

    const newProduct = larger.filter(id => !smaller.includes(id));

    if (newProduct.length === 1) {
      // add from product wishlist collection

      const productID = newProduct[0];

      const collRef = admin
        .firestore()
        .collection(
          `${FS_PRODUCTS_DB}/${productID}/${FS_PRODUCTS_INUSERWISHLIST_DB}`
        );

      await collRef.doc(userId).set({
        inWishlist: true
      });
    }
  }
};

export const handleSendNotificationsFromInvitationList = async (
  change: Change<firestore.DocumentSnapshot>,
  userId: string
) => {
  // this function will check for the email's presence
  // in the invitation "toEmail" and and send a notification
  // to the user and the invitee
  // TODO - do the above
  const afterData = change.after.data();

  // get the collection of invitations
  const collRef = admin.firestore().collection(FS_INVITATIONS_DB);

  const res = await collRef
    .where(InvitationsDBKeys.toEmail, '==', afterData![UserDBKeys.email])
    .get();

  if (!res.empty) {
    const docs = res.docs;
    for (let i = 0; i < docs.length; i++) {
      const data = docs[i].data();
      const docId = docs[i].id;
      // for self to add invitee to cirle
      generateNotification(NotificationTypes.AddInviteeToCircle, userId, {
        inviteeName: data[InvitationsDBKeys.fromName],
        inviteeUserId: data[InvitationsDBKeys.fromID]
      });
      // generate notification for Invitee to add this Invited person
      generateNotification(
        NotificationTypes.AddThisInvitedPersonToCircle,
        data[InvitationsDBKeys.fromID],
        {
          invitedPersonName: afterData![UserDBKeys.name],
          invitedPersonUserId: userId
        }
      );

      // delete the invitation entry
      collRef.doc(docId).delete();
    }
  }
};

export const sendWelcomeEmail = (afterData: any) => {
  // TODO implement sendgrid witht he email

  console.log(afterData![UserDBKeys.email]);
};
