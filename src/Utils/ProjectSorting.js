export const sortByDesiredOrder = (data, desiredOrder, key) => {
    return data
      .sort((a, b) => {
        const indexA = desiredOrder.indexOf(a[key]);
        const indexB = desiredOrder.indexOf(b[key]);
  
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        } else if (indexA !== -1) {
          return -1;
        } else if (indexB !== -1) {
          return 1;
        } else {
          return 0;
        }
      });
  };
  