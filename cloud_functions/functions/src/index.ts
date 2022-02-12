import { initializeApp } from 'firebase-admin';
import { handleCircleUserChanges } from './func_files/circleFuncs';
import {
  handleUserDataChange,
  readPublicUserData
} from './func_files/userFuncs';

initializeApp();

export { handleCircleUserChanges, handleUserDataChange, readPublicUserData };
