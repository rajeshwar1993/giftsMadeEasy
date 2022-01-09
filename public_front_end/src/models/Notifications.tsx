import { NotificationDBKeys } from '../common/dbKeys';
import { NotificationTypes } from './enums';

class Notifications {
  uid: string;
  type: NotificationTypes;
  redirectLink: string;
  text: string;
  read: boolean;
  createdTS: string;

  constructor(data: any, id: string) {
    this.uid = id;
    this.type = data[NotificationDBKeys.type];
    this.redirectLink = data[NotificationDBKeys.redirectLink];
    this.text = data[NotificationDBKeys.text];
    this.read = data[NotificationDBKeys.read];
    this.createdTS = data[NotificationDBKeys.createdTS];
  }

  convertToJson = () => ({
    [NotificationDBKeys.type]: this.type,
    [NotificationDBKeys.redirectLink]: this.redirectLink,
    [NotificationDBKeys.text]: this.text,
    [NotificationDBKeys.read]: this.read,
    [NotificationDBKeys.createdTS]: this.createdTS
  });
}

export default Notifications;
