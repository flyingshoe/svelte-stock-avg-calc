export const formatVal = (val, dec = 4) => {
    return val.toLocaleString(undefined, {
      // minimumFractionDigits: 0,
      maximumFractionDigits: dec,
    });
  };