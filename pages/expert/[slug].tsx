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

  const editModeHandler = () => setEditMode(!editMode);

  return (
    <div className={styles.expert}>
      <Avatar
        image_url={FAKE_EXPERT.image_url}
        name={FAKE_EXPERT.name}
        title={FAKE_EXPERT.title}
        editMode={editMode}
      />

      <Video editMode={editMode} video_url={FAKE_EXPERT.video_url} />

      <div className={styles.portfolio}>
        <About
          bio={FAKE_EXPERT.bio}
          language={FAKE_EXPERT.language}
          timezone={FAKE_EXPERT.timezone}
          socials={FAKE_EXPERT.socials}
          editMode={editMode}
        />

        <SkillsList skills={FAKE_EXPERT.skills} editMode={editMode} />
      </div>

      <FloatingButton changeEditMode={editModeHandler} editMode={editMode} />
    </div>
  );
}
