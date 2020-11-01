import { useState } from "react";
import styles from "../../styles/Expert.module.scss";
import About from "../../components/Expert/About";
import Avatar from "../../components/Expert/Avatar";
import SkillsList from "../../components/Expert/SkillsList";
import Video from "../../components/Expert/Video";
import FloatingButton from "../../components/Expert/FloatingButton";
import { FAKE_EXPERT } from "../../constants/placeholder";

export default function expert({ profile }) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tab, setTab] = useState("bio");

  const editModeHandler = () => setEditMode(!editMode);

  return (
    <div className={styles.expert}>
      <Avatar
        image_url={FAKE_EXPERT.image_url}
        name={profile.name}
        title={profile.title}
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

        {tab == "bio" && <About bio={profile.bio} editMode={editMode} />}
        {tab == "video" && (
          <Video editMode={editMode} video_url={profile.video_url} />
        )}
        {tab == "skills" && (
          <SkillsList skills={profile.skills} editMode={editMode} />
        )}
      </div>

      <FloatingButton
        changeEditMode={editModeHandler}
        editMode={editMode}
        profile={profile}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://strapi.esperti.live/profiles");
  const profiles = await res.json();

  const paths = profiles.map((profile) => ({
    params: { slug: profile.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://strapi.esperti.live/profiles/${params.slug}`
  );
  const profile = await res.json();

  console.log(profile);

  return {
    props: {
      profile,
    },
  };
};
