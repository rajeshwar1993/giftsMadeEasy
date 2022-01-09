import { initializeApp } from 'firebase-admin';
import { handleAddOrRemoveToCirle } from './func_files/circleFuncs';
import { handleUserDataChange } from './func_files/userFuncs';

initializeApp();

export { handleAddOrRemoveToCirle, handleUserDataChange };
