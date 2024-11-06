export const sleep = async (durationInMilliseconds: number): Promise<any> => {
  return new Promise((res) => {
    setTimeout(res, durationInMilliseconds);
  });
};
