const  isWithinOneDay = (dateString: string) => {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();

  const diff = now - createdAt;

  const oneDay = 24 * 60 * 60 * 1000;

  return diff <= oneDay;
};

export { isWithinOneDay };