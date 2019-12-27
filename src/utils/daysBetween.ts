const DAY = 1000 * 60 * 60 * 24;

export default (x: Date, y: Date) => {
  const utc1 = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
  const utc2 = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate());

  return Math.floor((utc2 - utc1) / DAY);
}