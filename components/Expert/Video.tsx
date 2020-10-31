import { useState, useEffect } from "react";
import styles from "../../styles/Expert.module.scss";
import { convertVideoUrlToEmbedded, getVideoId } from "../../utils/youtube";

interface VideoProps {
  editMode: boolean;
  video_url: string;
}

export default function Video({ editMode, video_url }: VideoProps) {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const updateVideoImage = (id) => {
    const videoImageUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    setBackgroundImage(videoImageUrl);
  };

  const updateVideoHandler = (e) => {
    e.preventDefault();
    const videoId = getVideoId(videoSrc);
    const embeddedUrl = convertVideoUrlToEmbedded(videoSrc);

    updateVideoImage(videoId);
    setVideoSrc(embeddedUrl);

    // send embeddedUrl to backend
    console.log("updating user video", embeddedUrl);
  };

  useEffect(() => {
    setVideoSrc(convertVideoUrlToEmbedded(video_url));
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
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.video}>
        <h6>My Intro</h6>
        <span>Quick introduction</span>
        <iframe
          src={videoSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    );
  }
}
