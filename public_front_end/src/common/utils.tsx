import { sendEmailVerification, User } from 'firebase/auth';

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
