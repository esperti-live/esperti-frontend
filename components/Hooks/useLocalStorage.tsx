export const useLocalStorage = (key: string) => {
  const setItemToLS = (val: any): void => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  const getItemFromLS = (): any => {
    let item: any;
    try {
      item = JSON.parse(localStorage.getItem(key));
    } catch (_) {
      item = "";
    } finally {
      return item;
    }
  };

  const removeItemFromLS = (): void => {
    localStorage.removeItem(key);
  };

  return { setItemToLS, getItemFromLS, removeItemFromLS };
};
