export const uniqueId = () =>
  new Date().getTime() + Math.round(Math.random() * 10000);
