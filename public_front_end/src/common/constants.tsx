// app constants
export const APP_NAME = 'TOFA';
export const CONTACT_EMAIL = 'contact@email.com';
export const CONTACT_NUMBER = '9999999999';
export const EXPORT_MODE = 'DYNAMIC';

// flags
export const RATE_LIMITER_FLAG = 'gmerlf32732flag';

// Firebase constants
export const FS_USER_DB = 'users';
export const FS_PRODUCTS_DB = 'products';
export const FS_CIRCLE_USERS_DB = 'circleUsers';
export const FS_INTEREST_TAGS_DB = 'interestTags';
export const FS_CONTACT_DB = 'contactUs';

export const RDB_NOTIFICATIONS_DB = 'notifications';

// error messages
export const ERROR_MESSAGE_MAPPING = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/weak-password':
      return 'Passowrd should be at least 6 characters long.';

    case 'auth/email-already-in-use':
      return 'Account with this E-mail Id alrealy exists.';

    case 'auth/invalid-email':
      return 'The E-mail Id is invalid.';

    case 'auth/wrong-password':
      return 'The Password is incorrect.';

    case 'auth/user-not-found':
      return 'No Account found with this E-mail Id.';

    case 'PASSWORD_MISMATCH':
      return 'Password and Confirm Password do not match!';

    case 'auth/invalid-phone-number':
      return 'Phone number is Invalid.';

    case 'auth/invalid-verification-code':
      return 'OTP is Invalid.';

    case 'auth/account-exists-with-different-credential':
      return 'This phone number is already linked to different account.';

    default:
      return 'Error occured. Please try again. Kindly write to us if the issue persists.';
  }
};
