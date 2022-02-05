import { sendEmailVerification, User } from 'firebase/auth';
import { RATE_LIMITER_FLAG } from './constants';

export const toggleTheme = () => {
  if (document.documentElement.classList.contains('root-dark')) {
    document.documentElement.classList.remove('root-dark');
  } else {
    document.documentElement.classList.add('root-dark');
  }
};

export const scrollToId = (id: string) => {
  let top = document.getElementById(id)!.offsetTop;
  window.scrollTo({
    behavior: 'smooth',
    top: top - 150
  });
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const sendEmailVerificationMail = (user: User) => {
  // sedning mail
  sendEmailVerification(user)
    .then(() => {
      // Email verification sent!
      // ...
      console.log('Verification email sent');
    })
    .catch(e => {
      console.log(e);
    });
};

export const cleanObject = (obj: any) => {
  for (let key in obj) {
    const val = obj[key];
    if (!val || val === '' || (Array.isArray(val) && val.length === 0)) {
      delete obj[key];
    }
  }

  return obj;
};

export const createUrlParamsFromObject = (filterObj: any) => {
  let paramString: Array<string> = [];

  for (let key in filterObj) {
    if (Array.isArray(filterObj[key])) {
      if (filterObj[key].length > 0) {
        filterObj[key].forEach((f: any) => {
          paramString.push(`${key}=${f}`);
        });
      }
    } else if (filterObj[key]) {
      paramString.push(`${key}=${filterObj[key]}`);
    }
  }

  return paramString.join('&');
};

export const setRateLimiter = () => {
  sessionStorage.setItem(RATE_LIMITER_FLAG, new Date().getTime().toString());
};

export const checkRateLimiter = (checkDuration: number) => {
  const setTime = sessionStorage.getItem(RATE_LIMITER_FLAG) || '';
  if (!setTime) return true;
  let lastTime = parseInt(setTime);
  let now = new Date().getTime();

  if (now - lastTime >= checkDuration * 1000) {
    return true;
  }
  return false;
};

export const clearRateLimiter = () => {
  sessionStorage.removeItem(RATE_LIMITER_FLAG);
};

export const createQueryUrlFromObject = (filterObj: any) => {
  let filters: any = [];

  for (let key in filterObj) {
    if (Array.isArray(filterObj[key])) {
      if (filterObj[key].length > 0) {
        let arrQ: any = [];

        filterObj[key].forEach((f: any) => arrQ.push(`${key}=${f}`));

        filters.push(arrQ.join('&'));
      }
    } else if (filterObj[key]) {
      filters.push(`${key}=${filterObj[key]}`);
    }
  }

  return filters.join('&');
};
