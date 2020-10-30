import { useState, useEffect } from "react";
import styles from "../../styles/Expert.module.scss";

interface VideoProps {
  editMode: boolean;
  video_url: string;
}

export default function Video({ editMode, video_url }: VideoProps) {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const getVideoId = () => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = videoSrc.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const updateVideoImage = (id) => {
    const videoImageUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    setBackgroundImage(videoImageUrl);
  };

  const updateVideoHandler = (e) => {
    e.preventDefault();
    const videoId = getVideoId();
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    updateVideoImage(videoId);
    setVideoSrc(embeddedUrl);

    // send embeddedUrl to backend
  };

  useEffect(() => {
    setVideoSrc(video_url);
  }, [video_url]);

  if (editMode) {
    return (
      <div className={styles.video}>
        <img
          src={backgroundImage || "/images/placeholder.png"}
          alt="Edit video"
          className={styles.editVideo}
        />

        <form onSubmit={updateVideoHandler}>
          <input
            type="text"
            value={videoSrc}
            onChange={(e) => setVideoSrc(e.target.value)}
            className={styles.changeVideo}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.video}>
        <iframe
          src={videoSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    );
  }
}
