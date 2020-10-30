import { useState } from "react";
import styles from "../../styles/Expert.module.scss";
import About from "../../components/Expert/About";
import Avatar from "../../components/Expert/Avatar";
import SkillsList from "../../components/Expert/SkillsList";
import Video from "../../components/Expert/Video";
import FloatingButton from "../../components/Expert/FloatingButton";
import { Expert } from "../../ts/interfaces";

const FAKE_EXPERT: Expert = {
  name: "Nik Vogrinec",
  tag: "Professional Noob",
  image_url: "/images/placeholder.png",
  introduction:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis felis risus. Vestibulum viverra posuere mollis. Praesent id ante a nisl consequat venenatis vitae id magna.",
  about:
    "Morbi rutrum eros vel mi iaculis gravida. Quisque iaculis vel diam at porttitor. Quisque tincidunt blandit felis et consequat. Sed id ante semper, ultrices odio ut, condimentum ante. Aenean orci est, viverra nec maximus et, faucibus nec diam. Ut in risus ut purus gravida gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  language: "english",
  video_url: "https://www.youtube.com/embed/LXb3EKWsInQ",
  timezone: "Timezone (+1:00)",
  socials: ["github", "facebook"],
  skills: [
    {
      name: "React",
      experience: 2,
      endorsements: 25,
      image_url: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia itaque suscipit, aperiam eligendi facere consequatur ipsa hic asperiores sit laboriosam!",
      technologies: ["React", "Redux", "React Native"],
    },
    {
      name: "React",
      experience: 2,
      endorsements: 25,
      image_url: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia itaque suscipit, aperiam eligendi facere consequatur ipsa hic asperiores sit laboriosam!",
      technologies: ["React", "Redux", "React Native"],
    },
  ],
};

export default function expert() {
  const [editMode, setEditMode] = useState<boolean>(false);

  const editModeHandler = () => setEditMode(!editMode);

  return (
    <div className={styles.expert}>
      <Avatar
        image_url={FAKE_EXPERT.image_url}
        name={FAKE_EXPERT.name}
        tag={FAKE_EXPERT.tag}
        editMode={editMode}
      />

      <Video editMode={editMode} video_url={FAKE_EXPERT.video_url} />

      <div className={styles.portfolio}>
        <About
          introduction={FAKE_EXPERT.introduction}
          about={FAKE_EXPERT.about}
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
