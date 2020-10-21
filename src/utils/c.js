const c = (...classNames) => {
  return classNames.filter(Boolean).join(' ');
};

export default c;
