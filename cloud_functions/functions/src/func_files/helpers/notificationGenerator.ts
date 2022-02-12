import { NotificationDBKeys } from './dbKeys';
import { NotificationTypes } from './enums';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'firebase-admin';
import { RDB_NOTIFICATIONS_DB } from './constants';

export const generateNotification = async (
  type: NotificationTypes,
  notificationForUserID: string,
  data: { [key: string]: any } = {}
) => {
  const notiObj = {
    [NotificationDBKeys.type]: '',
    [NotificationDBKeys.redirectLink]: '',
    [NotificationDBKeys.text]: '',
    [NotificationDBKeys.read]: false,
    [NotificationDBKeys.createdTS]: database.ServerValue.TIMESTAMP
  };
  switch (type) {
    case NotificationTypes.FirstRegister:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.FirstRegister.toString();
      notiObj[NotificationDBKeys.redirectLink] = '/profile';
      notiObj[
        NotificationDBKeys.text
      ] = `Welcome to the Tofa Circle, we are gifted to have you!`;
      break;
    case NotificationTypes.CompleteProfile:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.CompleteProfile.toString();
      notiObj[NotificationDBKeys.redirectLink] = '/profile';
      notiObj[
        NotificationDBKeys.text
        // eslint-disable-next-line max-len
      ] = `Let's get to completing your profile. This is as important as having breakfast!`;
      break;
    case NotificationTypes.CircleRequestSent:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.CircleRequestSent.toString();
      notiObj[NotificationDBKeys.redirectLink] = `/profile`;
      notiObj[
        NotificationDBKeys.text
      ] = `Someone has requested to add you in their circle. See who this is!`;
      break;
    case NotificationTypes.CircleRequestAccepted:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.CircleRequestSent.toString();
      notiObj[NotificationDBKeys.redirectLink] = `/profile`;
      notiObj[NotificationDBKeys.text] = `You have a new user in your circle.`;
      break;
    case NotificationTypes.UpcommingDate:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.UpcommingDate.toString();
      notiObj[NotificationDBKeys.redirectLink] = `/profile/${data.userID}`;
      notiObj[NotificationDBKeys.text] = `See whos is upcoming! `;
      break;
    case NotificationTypes.AddInviteeToCircle:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.AddInviteeToCircle.toString();
      notiObj[
        NotificationDBKeys.redirectLink
      ] = `/profile/${data.inviteeUserId}`;
      notiObj[
        NotificationDBKeys.text
        // eslint-disable-next-line max-len
      ] = `You were invited here by ${data.inviteeName}. Let's return the favour and add them to your circle.`;
      break;
    case NotificationTypes.AddThisInvitedPersonToCircle:
      notiObj[NotificationDBKeys.type] =
        NotificationTypes.AddThisInvitedPersonToCircle.toString();
      notiObj[
        NotificationDBKeys.redirectLink
      ] = `/profile/${data.invitedPersonUserId}`;
      notiObj[
        NotificationDBKeys.text
        // eslint-disable-next-line max-len
      ] = `${data.invitedPersonName} has just joined the platform. Let's extend the welcome and add them to your circle.`;
      break;
  }

  if (notiObj[NotificationDBKeys.text]) {
    // create a notification
    const notiID = uuidv4();
    const notiRef = database().ref(
      `${RDB_NOTIFICATIONS_DB}/${notificationForUserID}/${notiID}`
    );

    return notiRef.set(notiObj);
  }
};
