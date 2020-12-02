import { useContext, useState } from "react";
import styles from "../../styles/Expert.module.scss";
import About from "../../components/Expert/About";
import Avatar from "../../components/Expert/Avatar";
import SkillsList from "../../components/Expert/SkillsList";
import Video from "../../components/Expert/Video";
import FloatingButton from "../../components/Expert/FloatingButton";
import Head from "next/head";
import { getChannel } from "../../utils/chat";
import AuthContext from "../../contexts/AuthContext";
import Chat from "../../components/Chat/Chat";

export default function expert({ profile }) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tab, setTab] = useState("bio");
  const [showChat, setShowChat] = useState(false);
  const { user } = useContext(AuthContext);

  const editModeHandler = () => setEditMode(!editMode);
  const showChatHandler = () => setShowChat(!showChat);

  if (showChat) {
    return (
      <>
        <Chat
          channel={getChannel(user.id, profile.id)}
          other={profile}
          expert={profile}
        />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Esperti.live | {profile.name}</title>
        </Head>
        <div className={styles.expert}>
          <Avatar
            image={profile.image}
            name={profile.name}
            title={profile.title}
            editMode={editMode}
            rate={profile.rate}
            experience={profile.experience}
            id={profile.id}
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

            {tab == "bio" && (
              <About
                bio={profile.bio}
                editMode={editMode}
                userId={profile.id}
              />
            )}
            {tab == "video" && (
              <Video editMode={editMode} video_url={profile.video_url} />
            )}
            {tab == "skills" && (
              <SkillsList
                skills={profile.skills}
                editMode={editMode}
                userId={profile.id}
              />
            )}
          </div>

          <FloatingButton
            showChat={showChatHandler}
            changeEditMode={editModeHandler}
            editMode={editMode}
            profile={profile}
          />
        </div>
      </>
    );
  }
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles?type=expert`
  );
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/${params.slug}?type=expert`
  );
  const profile = await res.json();

  return {
    props: {
      profile,
    },
  };
};
