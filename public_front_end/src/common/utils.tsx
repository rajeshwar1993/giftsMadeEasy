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
