export const useLocalStorage = (key: string) => {
  const setItemToLS = (val: any): void => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  const getItemFromLS = (): any => {
    return JSON.parse(localStorage.getItem(key));
  };

  const removeItemFromLS = (): void => {
    localStorage.removeItem(key);
  };

  return { setItemToLS, getItemFromLS, removeItemFromLS };
};
