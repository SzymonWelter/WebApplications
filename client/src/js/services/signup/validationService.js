module.export = {
  validPesel: pesel => {
    return pesel.length === 11 || /^\d+$/.test(pesel);
  }
};
