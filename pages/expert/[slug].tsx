import { useState } from "react";
import styles from "../../styles/Expert.module.scss";
import About from "../../components/Expert/About";
import Avatar from "../../components/Expert/Avatar";
import SkillsList from "../../components/Expert/SkillsList";
import Video from "../../components/Expert/Video";
import FloatingButton from "../../components/Expert/FloatingButton";
import { FAKE_EXPERT } from "../../constants/placeholder";

export default function expert() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tab, setTab] = useState("bio");

  const editModeHandler = () => setEditMode(!editMode);

  return (
    <div className={styles.expert}>
      <Avatar
        image_url={FAKE_EXPERT.image_url}
        name={FAKE_EXPERT.name}
        title={FAKE_EXPERT.title}
        editMode={editMode}
      />

      <div className={styles.about}>
        <h2>About me</h2>
        <div className={styles.navPill}>
          <button
            type="button"
            className={tab == "bio" ? styles.active : ""}
            onClick={() => setTab("bio")}
          >
            Bio
          </button>
          <button
            type="button"
            className={tab == "skills" ? styles.active : ""}
            onClick={() => setTab("skills")}
          >
            Skills
          </button>
          <button
            type="button"
            className={tab == "video" ? styles.active : ""}
            onClick={() => setTab("video")}
          >
            Video
          </button>
        </div>

        {tab == "bio" && <About bio={FAKE_EXPERT.bio} editMode={editMode} />}
        {tab == "video" && (
          <Video editMode={editMode} video_url={FAKE_EXPERT.video_url} />
        )}
        {tab == "skills" && (
          <SkillsList skills={FAKE_EXPERT.skills} editMode={editMode} />
        )}
      </div>

      <FloatingButton changeEditMode={editModeHandler} editMode={editMode} />
    </div>
  );
}
