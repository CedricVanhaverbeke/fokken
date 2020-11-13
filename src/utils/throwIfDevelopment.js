const throwIfDevelopment = (
  shouldThrow,
  errorMessage = 'You should follow a React tutorial... This code errors.',
) => {
  if (process.env.NODE_ENV === 'development') {
    if (shouldThrow) {
      throw new Error(errorMessage);
    }
  }
};

export default throwIfDevelopment;
