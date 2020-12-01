export const formatDate = (rawDate: string, onlyFormat: boolean) => {
  const date = new Date(rawDate);

  if (!onlyFormat) {
    const todayDate = new Date();

    if (
      date.getDay() === todayDate.getDay() &&
      date.getMonth() === todayDate.getMonth() &&
      date.getFullYear() === todayDate.getFullYear()
    ) {
      return `Today`;
    } else if (
      date.getDay() - 1 === todayDate.getDay() &&
      date.getMonth() === todayDate.getMonth() &&
      date.getFullYear() === todayDate.getFullYear()
    ) {
      return `Yesterday`;
    }
  }

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};
