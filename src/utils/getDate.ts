const zeroP = (num: number) => `0${num}`.slice(-2);

export const currentDate = () => {
  // const date = new Date();
  const date = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000,
  );
  const y = date.getFullYear();
  const m = zeroP(date.getMonth() + 1);
  const d = zeroP(date.getDate());
  const H = zeroP(date.getHours());
  const M = zeroP(date.getMinutes());
  const S = zeroP(date.getSeconds());
  const timestamp = `${y}-${m}-${d} ${H}:${M}:${S}`;
  console.log(timestamp);

  return timestamp;
};
