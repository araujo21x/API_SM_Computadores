export default (type: string): boolean => {
  const typesValid: Array<String> = [
    'motherBoard',
    'cpu',
    'cooler',
    'ram',
    'rom',
    'm2',
    'pcieExpress',
    'powerSupply',
    'recorder'
  ];
  return typesValid.includes(type);
};
