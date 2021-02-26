export default (): string => {
  const name:string = Math.random().toString(36).substring(7);
  return name;
};
