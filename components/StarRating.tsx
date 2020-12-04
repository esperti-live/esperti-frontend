import styles from "../styles/components/StarRating.module.scss";

export default function StarRating({ rating, updateHandler }) {
  const generateStars = () => {
    const handleUpdate = (rate: number) => {
      if (updateHandler) {
        updateHandler(rate);
      }
    };

    return Array(5)
      .fill("")
      .map((_, i) => {
        if (i + 1 <= rating) {
          return (
            <svg
              key={i + 1}
              onClick={() => handleUpdate(i + 1)}
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 63 56"
            >
              <title>star</title>
              <g fill="#fed42d">
                <path d="M28.52 1.96l-7.18 14.56-16.07 2.34c-2.88 0.42-4.04 3.97-1.95 6.01l11.63 11.33-2.75 16.01c-0.49 2.89 2.55 5.06 5.1 3.7l14.38-7.55 14.38 7.55c2.55 1.34 5.6-0.81 5.1-3.7l-2.75-16.01 11.63-11.33c2.09-2.04 0.94-5.59-1.95-6l-16.07-2.35-7.18-14.56c-1.29-2.6-5.02-2.63-6.32 0z"></path>
              </g>
            </svg>
          );
        } else {
          return (
            <svg
              key={i + 1}
              onClick={() => handleUpdate(i + 1)}
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 63 56"
            >
              <title>star</title>
              <g fill="#a1abc4">
                <path d="M28.52 1.96l-7.18 14.56-16.07 2.34c-2.88 0.42-4.04 3.97-1.95 6.01l11.63 11.33-2.75 16.01c-0.49 2.89 2.55 5.06 5.1 3.7l14.38-7.55 14.38 7.55c2.55 1.34 5.6-0.81 5.1-3.7l-2.75-16.01 11.63-11.33c2.09-2.04 0.94-5.59-1.95-6l-16.07-2.35-7.18-14.56c-1.29-2.6-5.02-2.63-6.32 0z"></path>
              </g>
            </svg>
          );
        }
      });
  };
  return <div className={styles.starRating}>{generateStars()}</div>;
}
