export const getVideoId = (url) => {
  try{
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  } catch (err) {
    return 
  }
};


export const convertVideoUrlToEmbedded = (url: string) => {
  const videoId = getVideoId(url);
  return `https://www.youtube.com/embed/${videoId}`;
};
