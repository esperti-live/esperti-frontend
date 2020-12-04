import { useState, useEffect } from "react";
import { getVideoId } from "../../utils/youtube";
import Youtube from "react-youtube";

import styles from "../../styles/components/Video.module.scss";

interface VideoProps {
  editMode: boolean;
  video_url: string;
}

export default function Video({ editMode, video_url }: VideoProps) {
  const [videoId, setVideoId] = useState<string>("");
  const [videoFullUrl, setVideoFullUrl] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const updateVideoImage = (id) => {
    const videoImageUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    setBackgroundImage(videoImageUrl);
  };

  const updateVideoHandler = (e) => {
    e.preventDefault();

    const newVideoId = getVideoId(videoFullUrl);
    updateVideoImage(newVideoId);
    setVideoId(newVideoId);

    // send embeddedUrl to backend
    console.log("updating user video", videoId);
  };

  useEffect(() => {
    setVideoId(getVideoId(video_url));
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
            value={videoFullUrl}
            onChange={(e) => setVideoFullUrl(e.target.value)}
            className="editInput"
          />
          <button
            type="submit"
            className="saveButton"
            onClick={updateVideoHandler}
          >
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
        {videoId && <Youtube videoId={videoId} />}
      </div>
    );
  }
}
